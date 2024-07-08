package app.nextrole.api.service.gpt.completion

import com.fasterxml.jackson.annotation.JsonProperty

/**
 * @author Biz Melesse
 * created on 6/22/24
 */
data class CompletionResult(
    var id: String? = null,
    @JsonProperty("object") var completionObject: String? = null,
    var created: Long? = null,
    var model: String? = null,
    var choices: MutableList<CompletionChoice>? = null
)
