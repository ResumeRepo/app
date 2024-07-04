package app.nextrole.api.props

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary

/**
 * @author Biz Melesse
 * created on 7/3/24
 */

@Primary
@Configuration
@ConfigurationProperties(prefix = "auth")
class AuthProps {
     var enabled: Set<String>? = HashSet()
     var disabled: Set<String>? = HashSet()
}
