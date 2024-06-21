package app.nextrole.api.props

import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary

/**
 * @author Biz Melesse
 * created on 6/15/24
 */
@Qualifier("primary")
@Primary
@Configuration
@ConfigurationProperties("spring.datasource.postgres")
class PostgresDataSourceProps {
    var driverClassName: String? = null
    var url: String? = null
    var username: String? = null
    var password: String? = null
}
