package app.nextrole.api.utils.security

import app.nextrole.api.props.CorsProps
import app.nextrole.api.props.SourceProps
import org.springframework.stereotype.Service
import java.util.*

/**
 * @author Biz Melesse
 * created on 6/15/24
 */
@Service
class UnsecurePaths(val corsProps: CorsProps, val sourceProps: SourceProps) {
    fun paths(): List<String> {
        val unsecure =  mutableListOf(
            "/actuator/health",
            "/actuator/health/**",
            "/auth/login",
            "/auth/otp",
            "/auth/login/**",
            "/auth/otp/**",
        )
        if (sourceProps.profile.equals("dev")) {
            unsecure.addAll(listOf(
            "/graphql",
            "/graphql/**",
            "/graphiql",
            "/graphiql/**"
            ))
        }
        return unsecure
    }

    fun allow(path: String): Boolean {
        return paths().stream()
            .anyMatch { uri: String ->
                path.contains(
                    uri.lowercase(Locale.getDefault())
                )
            }
    }

    fun wildcardPaths(): Array<String> {
        return paths().stream()
            .filter { p -> p.endsWith("**") }
            .toArray { size -> arrayOfNulls<String>(size) }
    }

    fun allowedOrigin(remoteAddr: String?, path: String): Boolean {
        return corsProps.allowedOriginPatterns.contains(remoteAddr) &&
                paths().contains(path)
    }
}
