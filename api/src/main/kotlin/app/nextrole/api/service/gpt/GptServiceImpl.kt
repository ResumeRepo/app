package app.nextrole.api.service.gpt

import app.nextrole.api.GPTMessage
import app.nextrole.api.UserCompletionResponse
import app.nextrole.api.lib.openai.completion.CompletionRequest
import app.nextrole.api.lib.openai.completion.CompletionResponseMessage
import app.nextrole.api.lib.openai.completion.CompletionResult
import app.nextrole.api.props.OpenAiProps
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

    override fun buildCompletionRequest(context: String): CompletionRequest {
        val messages: MutableList<Map<String, Any?>> = ArrayList()

        val systemMessage: MutableMap<String, Any?> = HashMap()
        systemMessage["role"] = "system"
        systemMessage["content"] = openAiProps.systemMessage
        messages.add(systemMessage)

        val userMessage: MutableMap<String, Any?> = HashMap()
        userMessage["role"] = "user"
        userMessage["content"] = context
        messages.add(userMessage)

        return CompletionRequest
            .builder()
            .user("nextrole")
            .model(openAiProps.completionModel)
            .maxTokens(openAiProps.maxTokens)
            .temperature(openAiProps.temp)
            .messages(messages)
            .build()
    }

    override fun gptCompletionRequest(context: String): UserCompletionResponse {
        return makeCompletionRequest(buildCompletionRequest(context))
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
                    completionResult = objectMapper.readValue(resultStr, CompletionResult::class.java)
                    if (ObjectUtils.isEmpty(completionResult.choices) && !ObjectUtils.isEmpty(resultStr)) {
                        logger.error { resultStr }
                        return completionResponse
                    } else {
                        if (hasCompletionChoices(completionResult)) {
                            val responseMessage: CompletionResponseMessage =
                                completionResult.getChoices().get(0).getMessage()
                            val content: String = responseMessage.getContent()
                            completionResponse.messages = mutableListOf(GPTMessage(content = content))
                        }
                    }
                } catch (e: JsonProcessingException) {
                    logger.error { e }
                }
            } catch (e: IOException) {
                logger.error { e }
            }
        } catch (e: JsonProcessingException) {
            logger.error { e }
        }
        return completionResponse
    }

    private fun hasCompletionChoices(completionResult: CompletionResult): Boolean {
        return !ObjectUtils.isEmpty(completionResult.choices) &&
                completionResult.choices[0].message != null
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
