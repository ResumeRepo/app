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
@ConfigurationProperties(prefix = "spring.flyway.postgres")
class FlywayPostgresProps {
    var schemas: String? = null
    var locations: String? = null
    var cleanDisabled = true
}
