package app.nextrole.api.service.gpt.completion

import com.fasterxml.jackson.annotation.JsonProperty

/**
 * @author Biz Melesse
 * created on 6/22/24
 */
data class CompletionResult(
    var id: String,
    @JsonProperty("object") var completionObject: String,
    var created: Long,
    var model: String,
    var choices: MutableList<CompletionChoice>
)
