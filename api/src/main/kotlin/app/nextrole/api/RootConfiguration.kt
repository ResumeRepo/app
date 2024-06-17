package app.nextrole.api

import app.nextrole.api.controller.ControllerConfiguration
import app.nextrole.api.data.DataConfiguration
import app.nextrole.api.props.PropsConfiguration
import app.nextrole.api.service.ServiceConfiguration
import app.nextrole.api.utils.migration.FlywayPostgresMigration
import jakarta.annotation.PostConstruct
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import


/**
 * @author Biz Melesse
 * created on 3/17/24
 */

@Configuration
@Import(
    DataConfiguration::class,
    PropsConfiguration::class,
    ServiceConfiguration::class,
    ControllerConfiguration::class
)
class RootConfiguration(val flywayPostgresMigration: FlywayPostgresMigration) {

    @PostConstruct
    fun onStart() {
        flywayPostgresMigration.migrate(false)
    }
}
