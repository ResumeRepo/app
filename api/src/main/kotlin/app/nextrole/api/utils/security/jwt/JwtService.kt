package app.nextrole.api.utils.security.jwt

import app.nextrole.api.SessionUser
import com.google.firebase.auth.UserRecord

/**
 * @author Biz Melesse
 * created on 6/18/24
 */
interface JwtService {
    /**
     * Generate a long-lived JWT
     */
    fun generateToken(user: String): String

    fun getFirebaseUser(token: String): UserRecord

    fun jwtToUser(jwt: String): SessionUser
}
