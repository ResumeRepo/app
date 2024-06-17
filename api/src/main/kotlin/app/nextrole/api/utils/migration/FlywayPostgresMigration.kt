package app.nextrole.api.utils.migration

import app.nextrole.api.props.FlywayPostgresProps
import app.nextrole.api.props.PostgresDataSourceProps
import app.nextrole.api.props.SourceProps
import org.flywaydb.core.Flyway
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import io.github.oshai.kotlinlogging.KotlinLogging

private val logger = KotlinLogging.logger {}

/**
 * @author Biz Melesse
 * created on 3/17/24
 */

@Transactional
@Component
class FlywayPostgresMigration(
    @Qualifier("primary") val dataSourceProps: PostgresDataSourceProps,
    val sourceProps: SourceProps,
    val flywayPostgresProps: FlywayPostgresProps) {
    private val devProfiles: List<String> = mutableListOf("dev", "test", "testlocal", "testdocker")

    /**
     * Perform schema migration. Drop all schemas if dropSchema is true.
     * Ensure that schemas cannot be dropped by checking that the client
     * calling to drop any schema is an integration test.
     *
     * @param dropSchema
     */
    fun migrate(dropSchema: Boolean) {
        val flyway = Flyway.configure()
            .schemas(flywayPostgresProps.schemas?.split(",").toString())
            .cleanDisabled(flywayPostgresProps.cleanDisabled)
            .validateOnMigrate(true)
            .baselineOnMigrate(true)
            .dataSource(
                dataSourceProps.url,
                dataSourceProps.username,
                dataSourceProps.password
            )
        logger.debug { "Performing schema migration" }
        if (dropSchema) {
            if (!devProfiles.contains(sourceProps.profile)) {
                throw IllegalArgumentException("Cannot drop schema for non-dev profile")
            }
            val stackTraceElements = Thread.currentThread().stackTrace
            var isIntegrationTest = false
            for (element: StackTraceElement in stackTraceElements) {
                if (element.className.contains("IntegrationTest")) {
                    isIntegrationTest = true
                    break
                }
            }
            if (isIntegrationTest) {
                flyway.load().clean()
            } else {
                throw IllegalArgumentException(
                    "Dropping schema is not allowed outside of integration tests. " +
                            "If this is an integration test, please make sure that the test class name has the suffix " +
                            "'IntegrationTest'"
                )
            }
        }
        flyway.locations(flywayPostgresProps.locations).load().migrate()
    }
}

