package app.nextrole.api.service.gpt.completion

/**
 * @author Biz Melesse
 * created on 6/22/24
 */
data class CompletionResponseMessage(
    var role: String? = null,
    var content: String? = null)
