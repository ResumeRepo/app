package app.nextrole.api.props

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary

/**
 * @author Biz Melesse
 * created on 3/17/24
 */

@Primary
@Configuration
@ConfigurationProperties(prefix = "cors")
class CorsProps {
    var allowedOriginPatterns: Set<String> = HashSet()
}

