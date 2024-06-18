package app.nextrole.api.utils.security.jwt

import com.google.firebase.auth.UserRecord

/**
 * @author Biz Melesse
 * created on 6/18/24
 */
interface JwtService {
    /**
     * Generate a long-lived JWT
     */
    fun generateToken(uid: String): String

    fun getFirebaseUser(token: String): UserRecord
}
