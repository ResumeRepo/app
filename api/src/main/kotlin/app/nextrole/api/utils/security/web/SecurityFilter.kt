package app.nextrole.api.utils.security.web

import app.nextrole.api.SessionUser
import app.nextrole. api.props.AuthProps
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseToken
import app.nextrole.api.utils.security.Credentials
import app.nextrole.api.utils.security.UnsecurePaths
import app.nextrole.api.utils.security.jwt.JwtService
import app.nextrole.api.utils.security.jwt.JwtServiceImpl
import com.google.firebase.auth.UserRecord
import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.util.StringUtils
import org.springframework.web.filter.OncePerRequestFilter
import java.io.IOException
import java.net.InetAddress
import java.util.*
import java.util.stream.Stream

/**
 * @author Biz Melesse
 * created on 6/15/24
 */

@Component
class SecurityFilter(
    val unsecurePaths: UnsecurePaths,
    val jwtService: JwtService,
    val authProps: AuthProps
) : OncePerRequestFilter() {

    @Throws(IOException::class, ServletException::class)
    override fun doFilterInternal(
        httpServletRequest: HttpServletRequest,
        httpServletResponse: HttpServletResponse,
        filterChain: FilterChain
    ) {
        // All non-preflight requests must have a valid authorization token
        val methodExcluded = Stream.of("options")
            .anyMatch { method: String? ->
                httpServletRequest.method.lowercase(Locale.getDefault()).contains(
                    method!!
                )
            }
        if (httpServletRequest.requestURI.lowercase(Locale.getDefault()).contains("/favicon.ico")) {
            return
        }
        val uriExcluded: Boolean = unsecurePaths.allow(httpServletRequest.requestURI)
        if (!(methodExcluded || uriExcluded ||
                    unsecurePaths.allowedOrigin(
                        httpServletRequest.remoteHost,
                        httpServletRequest.requestURI
                    ))
        ) {
            verifyToken(httpServletRequest, httpServletResponse)
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse)
    }

    @Throws(IOException::class)
    private fun verifyToken(
        httpServletRequest: HttpServletRequest,
        httpServletResponse: HttpServletResponse
    ) {
        val bearerToken = getBearerToken(httpServletRequest)
        var user = SessionUser()
        val credentials = Credentials()
        if (bearerToken.startsWith(JwtServiceImpl.jwtPrefix) &&
            authProps.enabled?.contains("jwt") == true) {
            user = jwtService.jwtToUser(bearerToken)
        } else if (authProps.enabled?.contains("firebase") == true) {
            val decodedToken = FirebaseAuth.getInstance().verifyIdToken(bearerToken)
            user = firebaseTokenToSessionUser(decodedToken)
        }
        assert(user.userId != null)
        user.anonymous = true
        user.token = bearerToken

        credentials.authToken = bearerToken
        val authentication = UsernamePasswordAuthenticationToken(
            user, credentials,
            user.roles?.let { getAuthorities(it) }
        )
        authentication.details = WebAuthenticationDetailsSource().buildDetails(httpServletRequest)
        SecurityContextHolder.getContext().authentication = authentication
    }

    private fun isLocalHost(httpServletRequest: HttpServletRequest): Boolean {
        val localhost = InetAddress.getLocalHost()
        return httpServletRequest.remoteAddr == localhost.hostAddress
    }

    private fun firebaseTokenToSessionUser(decodedToken: FirebaseToken?): SessionUser {
        val user = SessionUser()
        if (decodedToken != null) {
            user.userId = decodedToken.uid
            user.name = decodedToken.name
            user.email = decodedToken.email
            user.avatar = decodedToken.picture
            val parsedClaims: MutableMap<String, Boolean> = HashMap()
            val claimsToParse = decodedToken.claims
            for ((key, value) in claimsToParse) {
                if (key.startsWith("ROLE_")) {
                    parsedClaims[key] = value as Boolean
                }
            }
            user.roles = parsedClaims
        }
        return user
    }

    private fun userRecordToSessionUser(userRecord: UserRecord): SessionUser {
        val user = SessionUser()
        user.userId = userRecord.uid
        user.name = userRecord.displayName
        user.email = userRecord.email
        user.avatar = userRecord.photoUrl
        val parsedClaims: MutableMap<String, Boolean> = HashMap()
        val claimsToParse = userRecord.customClaims
        for ((key, value) in claimsToParse) {
            if (key.startsWith("ROLE_")) {
                parsedClaims[key] = value as Boolean
            }
        }
        user.roles = parsedClaims
        return user
    }

    @Throws(IOException::class)
    private fun getBearerToken(httpServletRequest: HttpServletRequest): String {
        var bearerToken = ""
        val authorization = httpServletRequest.getHeader("Authorization")
        if (StringUtils.hasText(authorization)) {
             if (authorization.startsWith("Bearer ")) {
                 bearerToken = authorization.substring(7)
            }
        }
        return bearerToken
    }

    private fun getAuthorities(claims: Map<String, Boolean>): Collection<GrantedAuthority> {
        val authorities: MutableCollection<GrantedAuthority> = ArrayList()
        for ((key, value) in claims) {
            if (key.startsWith("ROLE_") && value) {
                authorities.add(SimpleGrantedAuthority(key))
            }
        }
        return authorities
    }
}

