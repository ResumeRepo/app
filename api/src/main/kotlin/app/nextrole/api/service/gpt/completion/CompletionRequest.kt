package app.nextrole.api.service.gpt.completion

import com.fasterxml.jackson.annotation.JsonProperty

/**
 * @author Biz Melesse
 * created on 6/22/24
 */
data class CompletionRequest(
    var model: String,
    @JsonProperty("max_tokens") var maxTokens: Int,
    var temperature: Double,
    var user: String,
    var messages: MutableList<CompletionMessage>
    )
