package app.nextrole.api.service.gpt.completion

import com.fasterxml.jackson.annotation.JsonProperty

/**
 * @author Biz Melesse
 * created on 6/22/24
 */
data class CompletionResponseMessage(
    var role: String? = null,
    var content: String? = null,
    @JsonProperty("function_call") var functionCall: GPTFunctionCallPayload? = null)
