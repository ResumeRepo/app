package app.nextrole.api.service.gpt

import app.nextrole.api.SessionUser
import app.nextrole.api.UserCompletionResponse
import app.nextrole.api.service.gpt.completion.CompletionRequest

/**
 * @author Biz Melesse
 * created on 6/22/24
 */
interface GptService {
    fun buildCompletionRequest(context: String, responseFormat: Any, user: SessionUser): CompletionRequest

    fun gptCompletionRequest(context: String, responseFormat: Any, user: SessionUser): UserCompletionResponse
}
