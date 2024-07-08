package app.nextrole.api.service.gpt

import app.nextrole.api.GPTMessage
import app.nextrole.api.UserCompletionResponse
import app.nextrole.api.props.OpenAiProps
import app.nextrole.api.service.gpt.completion.*
import app.nextrole.api.service.utils.getSessionUser
import com.fasterxml.jackson.core.JsonProcessingException
import com.fasterxml.jackson.databind.ObjectMapper
import com.google.gson.Gson
import io.github.oshai.kotlinlogging.KotlinLogging
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody
import okhttp3.RequestBody.Companion.toRequestBody
import org.springframework.stereotype.Service
import org.springframework.util.ObjectUtils
import java.io.IOException
import java.net.SocketTimeoutException
import java.util.concurrent.TimeUnit

@Service
class GptServiceImpl(
     val objectMapper: ObjectMapper,
     val openAiProps: OpenAiProps
) : GptService {
    private val logger = KotlinLogging.logger {}

    override fun buildCompletionRequest(context: String, function: GPTFunction): CompletionRequest {
        val messages: MutableList<CompletionRequestMessage> = ArrayList()

        val systemMessage =  CompletionRequestMessage(
            role = "system",
            content = openAiProps.systemMessage!!
        )
        messages.add(systemMessage)

        val userMessage =  CompletionRequestMessage(
            role = "user",
            content = context!!
        )

        messages.add(userMessage)

        val sessionUser = getSessionUser()
        return CompletionRequest(
            user = sessionUser.userId!!,
            model = openAiProps.completionModel!!,
            maxTokens = openAiProps.maxTokens!!,
            temperature = openAiProps.temp,
            functionCall = "auto",
            functions = mutableListOf(function),
            messages = messages)
    }

    override fun gptCompletionRequest(context: String, function: GPTFunction): UserCompletionResponse {
        return makeCompletionRequest(buildCompletionRequest(context, function))
    }

    private fun makeCompletionRequest(completionRequest: CompletionRequest): UserCompletionResponse {
        val json: String
        var completionResponse = UserCompletionResponse()
        try {
            json = objectMapper.writeValueAsString(completionRequest)
            logger.info { "GPT Request: ${objectMapper.writerWithDefaultPrettyPrinter()
                .writeValueAsString(completionRequest)}" }
            var completionResult: CompletionResult
            try {
                val resultStr: String = httpRequest(json)
                try {
                    logger.info { "GPT Response: ${objectMapper.writerWithDefaultPrettyPrinter()
                        .writeValueAsString(completionRequest)}" }
                    completionResult = objectMapper.readValue(resultStr, CompletionResult::class.java)
                    if (ObjectUtils.isEmpty(completionResult.choices) && !ObjectUtils.isEmpty(resultStr)) {
                        logger.error { resultStr }
                        return completionResponse
                    } else {
                        if (hasCompletionChoices(completionResult)) {
                            val responseMessage: CompletionResponseMessage? =
                                completionResult.choices?.get(0)?.message
                            val functionCall: GPTFunctionCallPayload? = responseMessage?.functionCall
                            val content: String? = responseMessage?.content
                            if (functionCall != null) {
                                completionResponse.messages = mutableListOf(GPTMessage(content = functionCall.arguments))
                            } else if (content != null) {
                                completionResponse.messages = mutableListOf(GPTMessage(content = content))
                            }
                        }
                    }
                } catch (e: JsonProcessingException) {
                    e.printStackTrace()
                }
            } catch (e: IOException) {
                e.printStackTrace()
            }
        } catch (e: JsonProcessingException) {
            e.printStackTrace()
        }
        return completionResponse
    }

    private fun hasCompletionChoices(completionResult: CompletionResult): Boolean {
        return !ObjectUtils.isEmpty(completionResult.choices)
    }

    @Throws(IOException::class)
    private fun httpRequest(prompt: String): String {
        val httpClient: OkHttpClient = OkHttpClient.Builder()
            .connectTimeout(180, TimeUnit.SECONDS) // 10 seconds for connection timeout
            .readTimeout(120, TimeUnit.SECONDS) // 30 seconds for read timeout
            .writeTimeout(30, TimeUnit.SECONDS)
            .build()
        val body: RequestBody = prompt
            .toRequestBody("application/json".toMediaTypeOrNull())
        val request: Request = Request.Builder()
            .url(openAiProps.completionEndpoint)
            .addHeader("Authorization", "Bearer " + openAiProps.apiKey)
            .post(body)
            .build()
        val call = httpClient.newCall(request)
        return try {
            val response = call.execute()
            val r = response.body!!.string()
            response.close()
            r
        } catch (e: SocketTimeoutException) {
            val err: MutableMap<String, Any> = java.util.HashMap()
            err["message"] = e.localizedMessage
            Gson().toJson(err)
        }
    }
}
