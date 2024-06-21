package app.nextrole.api.service

import app.nextrole.api.data.DataConfiguration
import app.nextrole.api.props.PropsConfiguration
import app.nextrole.api.utils.TestUtilConfiguration
import app.nextrole.api.utils.mapper.ObjectMapperConfiguration
import app.nextrole.api.utils.migration.FlywayMigrationConfiguration
import org.springframework.boot.SpringBootConfiguration
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration
import org.springframework.context.annotation.Import

/**
 * @author Biz Melesse
 * created on 6/15/24
 */

@SpringBootConfiguration
@EnableAutoConfiguration(exclude = [UserDetailsServiceAutoConfiguration::class])
@Import(
    ObjectMapperConfiguration::class,
    PropsConfiguration::class,
    DataConfiguration::class,
    FlywayMigrationConfiguration::class,
    TestUtilConfiguration::class,
    ServiceConfiguration::class
)
class ServiceTestConfiguration {
}
