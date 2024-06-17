package app.nextrole.api.service.firebase

import com.google.firebase.auth.FirebaseAuthException
import com.google.firebase.auth.UserRecord
import java.io.IOException

/**
 * @author Biz Melesse
 * created on 3/17/24
 */

interface FirebaseService {
    @Throws(FirebaseAuthException::class)
    fun createUser(
        email: String?,
        password: String?,
        phoneNumber: String?,
        displayName: String?,
        photoUrl: String?
    ): UserRecord?

    fun getUserByEmail(email: String?): UserRecord?

    @Throws(FirebaseAuthException::class)
    fun getIdToken(uid: String?): String?

    @Throws(FirebaseAuthException::class)
    fun deleteUser(uid: String?)
    fun createCustomClaims(uid: String?, claims: List<String?>?)
    fun updateCustomClaims(uid: String?, claims: List<String?>?)

    @Throws(IOException::class)
    fun login(email: String?, password: String?): String?
    fun getUserByPhoneNumber(phone: String?): UserRecord?
//    fun getAllUsers(pageableRequest: PageableRequest): String?
}
