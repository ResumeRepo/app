//package app.nextrole.api.service.firebase
//
//import com.fasterxml.jackson.core.type.TypeReference
//import com.fasterxml.jackson.databind.ObjectMapper
//import com.google.firebase.auth.*
//import app.nextrole.api.props.FirebaseProps
//import jakarta.servlet.http.HttpServletResponse
//import org.apache.http.client.methods.HttpPost
//import org.apache.http.entity.StringEntity
//import org.apache.http.impl.client.HttpClients
//import org.springframework.stereotype.Service
//import org.springframework.util.ObjectUtils
//import java.io.IOException
//import java.io.UnsupportedEncodingException
//import java.util.*
//
///**
// * @author Biz Melesse
// * created on 6/15/24
// */
//
//@Service
//class FirebaseServiceImpl(
//    val objectMapper: ObjectMapper,
//    val firebaseProps: FirebaseProps,
//    val staffProps: StaffProps,
//    val httpServletResponse: HttpServletResponse) : FirebaseService {
//    private val typeRef: TypeReference<HashMap<String, String>> = object TypeReference<HashMap<String, String>?>() {}
////    private val objectMapper: ObjectMapper? = null
////    private val firebaseProps: FirebaseProps? = null
////    private val staffProps: StaffProps? = null
////    private val httpServletResponse: HttpServletResponse? = null
//
//    @Throws(FirebaseAuthException::class)
//    override fun createUser(
//        email: String?,
//        password: String?,
//        phoneNumber: String?,
//        displayName: String?,
//        photoUrl: String?
//    ): UserRecord {
//        val request = UserRecord.CreateRequest()
//            .setEmail(email)
//            .setEmailVerified(false)
//            .setPassword(password)
//            .setPhoneNumber(phoneNumber)
//            .setDisplayName(displayName)
//            .setPhotoUrl(photoUrl)
//            .setDisabled(false)
//        return FirebaseAuth.getInstance().createUser(request)
//    }
//
//    override fun getUserByEmail(email: String?): UserRecord? {
//        return try {
//            FirebaseAuth.getInstance().getUserByEmail(email)
//        } catch (e: FirebaseAuthException) {
//            null
//        }
//    }
//
//    @Throws(FirebaseAuthException::class)
//    override fun getIdToken(uid: String?): String? {
//        val customToken = FirebaseAuth.getInstance().createCustomToken(uid)
//        val jsonNode = objectMapper!!.createObjectNode()
//        jsonNode.put("token", customToken)
//        jsonNode.put("returnSecureToken", true)
//        val httpClient = HttpClients.createDefault()
//        val params: StringEntity
//        params = try {
//            StringEntity(jsonNode.toString())
//        } catch (e: UnsupportedEncodingException) {
//            throw RuntimeException(e)
//        }
//        val postRequest = HttpPost(
//            java.lang.String.format(
//                "%s?key=%s", firebaseProps.getCustomTokenVerificationUrl(),
//                firebaseProps.getClientApiKey()
//            )
//        )
//        postRequest.addHeader("content-type", "application/json")
//        postRequest.entity = params
//        var response: Map<String, String>? = null
//        try {
//            response = objectMapper.readValue(
//                httpClient.execute(postRequest).entity.content,
//                typeRef
//            )
//            httpClient.close()
//        } catch (e: IOException) {
//            throw RuntimeException(e)
//        }
//        return response["idToken"]
//    }
//
//    @Throws(FirebaseAuthException::class)
//    override fun deleteUser(uid: String?) {
//        FirebaseAuth.getInstance().deleteUser(uid)
//    }
//
//    fun createCustomClaims(uid: String?, claims: List<String>) {
//        val customClaims: MutableMap<String, Any> = HashMap()
//        try {
//            for (claim in claims) {
//                customClaims[claim] = true
//            }
//            FirebaseAuth.getInstance().setCustomUserClaims(uid, customClaims)
//        } catch (e: FirebaseAuthException) {
//            log.error(e.localizedMessage)
//        } catch (e: NullPointerException) {
//            log.error(e.localizedMessage)
//        }
//    }
//
//    fun updateCustomClaims(uid: String?, claims: List<String>) {
//        createCustomClaims(uid, claims)
//    }
//
//    @Throws(IOException::class)
//    override fun login(email: String?, password: String?): String? {
//        val jsonNode = objectMapper!!.createObjectNode()
//        jsonNode.put("email", email)
//        jsonNode.put("password", password)
//        jsonNode.put("returnSecureToken", true)
//        val httpClient = HttpClients.createDefault()
//        val params = StringEntity(jsonNode.toString())
//        val postRequest = HttpPost(
//            java.lang.String.format(
//                "%s?key=%s", firebaseProps.getPasswordVerificationUrl(),
//                firebaseProps.getClientApiKey()
//            )
//        )
//        postRequest.addHeader("content-type", "application/json")
//        postRequest.entity = params
//        var token = ""
//        try {
//            val response: Map<String, String> = objectMapper.readValue(
//                httpClient.execute(postRequest).entity.content,
//                typeRef
//            )
//            token = response["idToken"]
//        } catch (e: Exception) {
//            log.error("Login failure: {}", e.localizedMessage)
//            httpClient.close()
//        }
//        return token
//    }
//
//    override fun getUserByPhoneNumber(phone: String?): UserRecord? {
//        return try {
//            FirebaseAuth.getInstance().getUserByPhoneNumber(phone)
//        } catch (e: FirebaseAuthException) {
//            null
//        }
//    }
//
//    override fun getAllUsers(pageableRequest: PageableRequest): String? {
//        val user: SessionUser = FHUtils.getSessionUser()
//        if (!staffProps.getEmails().contains(user.getEmail())) {
//            FHUtils.raiseHttpError(
//                httpServletResponse, objectMapper, "Unauthorized",
//                HttpStatus.FORBIDDEN_403
//            )
//            return null
//        }
//        return try {
//            val usersResult = FirebaseAuth.getInstance().listUsers(
//                null,
//                pageableRequest.getLimit()
//            )
//            val joiner = StringJoiner("\n")
//            joiner.add("firstName,lastName,email")
//            for (record in usersResult.values) {
//                val name: Pair<String, String> =
//                    FHUtils.parseFullName(WordUtils.capitalize(record.displayName))
//                val email = if (!ObjectUtils.isEmpty(record.email)) record.email else ""
//                val row = java.lang.String.format(
//                    "%s,%s,%s",
//                    name.getFirst(),
//                    name.getSecond(),
//                    email
//                )
//                joiner.add(row)
//            }
//            joiner.toString()
//        } catch (e: FirebaseAuthException) {
//            throw RuntimeException(e.message)
//        }
//    }
//}
//
