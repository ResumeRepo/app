package app.nextrole.api

import app.nextrole.api.controller.ControllerConfiguration
import app.nextrole.api.data.DataConfiguration
import app.nextrole.api.props.PropsConfiguration
import app.nextrole.api.props.SupabaseProps
import app.nextrole.api.service.ServiceConfiguration
import app.nextrole.api.utils.migration.FlywayPostgresMigration
import io.github.jan.supabase.SupabaseClient
import io.github.jan.supabase.createSupabaseClient
import io.github.jan.supabase.gotrue.Auth
import io.github.jan.supabase.serializer.JacksonSerializer
import jakarta.annotation.PostConstruct
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import


/**
 * @author Biz Melesse
 * created on 6/15/24
 */

@Configuration
@Import(
    DataConfiguration::class,
    PropsConfiguration::class,
    ServiceConfiguration::class,
    ControllerConfiguration::class
)
class RootConfiguration(
    val flywayPostgresMigration: FlywayPostgresMigration,
    val supabaseProps: SupabaseProps
) {

    @PostConstruct
    fun onStart() {
        flywayPostgresMigration.migrate(false)
    }

    @Bean
    fun initSupabase(): SupabaseClient {
        return createSupabaseClient(
            supabaseUrl = supabaseProps.projectUrl!!,
            supabaseKey = supabaseProps.apiKey!!
        ) {
            defaultSerializer = JacksonSerializer()
            install(Auth)
        }
    }
}
