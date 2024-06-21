package app.nextrole.api.props

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary

/**
 * @author Biz Melesse
 * created on 6/15/24
 */

@Primary
@Configuration
@ConfigurationProperties(prefix = "source")
class SourceProps {
    var profile: String? = null
    var name: String? = null
    var baseUrl: String? = null
}

