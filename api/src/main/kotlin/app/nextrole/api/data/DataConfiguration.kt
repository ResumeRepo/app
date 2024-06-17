package app.nextrole.api.data

import app.nextrole.api.data.postgres.PostgresDBDataConfiguration
import app.nextrole.api.props.PropsConfiguration
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.autoconfigure.flyway.FlywayAutoConfiguration
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import

/**
 * @author Biz Melesse
 * created on 3/17/24
 */
@Configuration
@ComponentScan
@EnableAutoConfiguration(exclude = [FlywayAutoConfiguration::class])
@Import(
    PostgresDBDataConfiguration::class,
    PropsConfiguration::class
)
class DataConfiguration
