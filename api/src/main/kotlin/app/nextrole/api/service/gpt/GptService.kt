package app.nextrole.api.service.gpt

import app.nextrole.api.UserCompletionResponse
import app.nextrole.api.service.gpt.completion.CompletionRequest
import app.nextrole.api.service.gpt.completion.GPTFunction

/**
 * @author Biz Melesse
 * created on 6/22/24
 */
interface GptService {
    fun buildCompletionRequest(context: String, function: GPTFunction): CompletionRequest

    fun gptCompletionRequest(context: String, function: GPTFunction): UserCompletionResponse
}
