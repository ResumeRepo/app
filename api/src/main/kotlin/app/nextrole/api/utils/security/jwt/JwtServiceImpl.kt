package app.nextrole.api.utils.security.jwt

import app.nextrole.api.SessionUser
import app.nextrole.api.props.FirebaseProps
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.UserRecord
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import org.springframework.stereotype.Service
import java.util.*
import javax.crypto.SecretKey


@Service
class JwtServiceImpl(private val firebaseProps: FirebaseProps) : JwtService {

    companion object {
        val jwtPrefix: String
            get() = "nr"
    }

    override fun generateToken(uid: String): String {
        return jwtPrefix + Jwts
            .builder()
            .issuedAt(Date(System.currentTimeMillis()))
            .subject(uid)
            .expiration(Date(Long.MAX_VALUE))
            .signWith(getSignInKey())
            .compact()
    }

    override fun getFirebaseUser(token: String): UserRecord {
        val user = FirebaseAuth.getInstance().getUser(extractSubject(token.substring(2)))
        assert(user != null)
        return user
    }

    override fun jwtToUser(jwt: String): SessionUser {
        return SessionUser(userId = extractSubject(jwt.substring(2)))
    }

    private fun getSignInKey(): SecretKey {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(firebaseProps.privateKey))
    }

    private fun extractSubject(token: String): String {
        return extractAllClaims(token).subject
    }

    private fun extractAllClaims(token: String): Claims {
        return Jwts
            .parser()
            .verifyWith(getSignInKey())
            .build()
            .parseSignedClaims(token)
            .payload
    }
}
