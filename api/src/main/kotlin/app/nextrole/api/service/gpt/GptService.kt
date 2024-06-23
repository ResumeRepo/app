package app.nextrole.api.service.gpt

import app.nextrole.api.UserCompletionResponse
import app.nextrole.api.lib.openai.completion.CompletionRequest

/**
 * @author Biz Melesse
 * created on 6/22/24
 */
interface GptService {
    fun buildCompletionRequest(context: String): CompletionRequest

    fun gptCompletionRequest(context: String): UserCompletionResponse
}
