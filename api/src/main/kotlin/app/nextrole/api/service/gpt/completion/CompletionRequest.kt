package app.nextrole.api.service.gpt.completion

import com.fasterxml.jackson.annotation.JsonProperty

/**
 * @author Biz Melesse
 * created on 6/22/24
 */
data class CompletionRequest(
    var model: String,
    var temperature: Double,
    var user: String,
    var messages: MutableList<CompletionRequestMessage>,
    @JsonProperty("response_format") var responseFormat: Any,
    @JsonProperty("max_tokens") var maxTokens: Int
)
