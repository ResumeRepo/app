package app.nextrole.api.service.gpt.completion

/**
 * @author Biz Melesse
 * created on 6/23/24
 */
data class GPTFunction(
    var name: String? = null,
    var description: String? = null,
    var parameters: MutableMap<String, Any>? = null
)
