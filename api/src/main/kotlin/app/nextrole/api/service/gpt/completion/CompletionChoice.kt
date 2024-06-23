package app.nextrole.api.service.gpt.completion

import com.fasterxml.jackson.annotation.JsonProperty

/**
 * @author Biz Melesse
 * created on 6/22/24
 */
data class CompletionChoice(
    /**
     * The generated text. Will include the prompt if {@link CompletionRequestzz#echo } is true
     */
    var text: String,
    var message: CompletionResponseMessage,
    var index: Int,
    @JsonProperty("finish_reason") var finishReason: String
)
