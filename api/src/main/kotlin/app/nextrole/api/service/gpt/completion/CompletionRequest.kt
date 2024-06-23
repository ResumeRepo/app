package app.nextrole.api.service.gpt.completion

import com.fasterxml.jackson.annotation.JsonProperty

/**
 * @author Biz Melesse
 * created on 6/22/24
 */
data class CompletionRequest(
    var model: String,
    var functions: MutableList<Any?>,
    var temperature: Double,
    var user: String,
    var messages: MutableList<CompletionRequestMessage>,
    @JsonProperty("max_tokens") var maxTokens: Int,
    @JsonProperty("function_call") var functionCall: String,
    )
