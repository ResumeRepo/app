package app.nextrole.api.props

import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration

/**
 * @author Biz Melesse
 * created on 3/17/24
 */

@Configuration
@ComponentScan
@EnableConfigurationProperties(value = [
    FlywayPostgresProps::class,
    FirebaseProps::class,
    CorsProps::class,
    PostgresDataSourceProps::class
])
class PropsConfiguration
