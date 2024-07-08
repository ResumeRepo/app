package app.nextrole.api.service.gpt.completion

/**
 * @author Biz Melesse
 * created on 6/23/24
 */
class GPTFunctionCallPayload {
    var name: String? = null
    var arguments: String? = null
    var requestPayload: MutableMap<String, Any> = HashMap()

//    fun getRequestPayload(objectMapper: ObjectMapper): Map<String, Any> {
//        if (!ObjectUtils.isEmpty(arguments)) {
//            val typeRef: TypeReference<Map<String, Any>> =
//                object : TypeReference<Map<String?, Any?>?>() {}
//            try {
//                requestPayload = objectMapper.readValue(arguments, typeRef)
//            } catch (e: JsonProcessingException) {
//                e.printStackTrace()
//            }
//        }
//        return requestPayload
//    }
}
