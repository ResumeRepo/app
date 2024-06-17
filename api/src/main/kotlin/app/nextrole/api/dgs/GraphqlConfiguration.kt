package app.nextrole.api.dgs

import graphql.scalars.ExtendedScalars
import graphql.schema.idl.RuntimeWiring
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.graphql.execution.RuntimeWiringConfigurer

/**
 * @author Biz Melesse
 * created on 3/18/24
 */
@Configuration
@ComponentScan
class GraphqlConfiguration {
    @Bean
    fun runtimeWiringConfigurer(): RuntimeWiringConfigurer {
        return RuntimeWiringConfigurer { wiringBuilder: RuntimeWiring.Builder ->
            wiringBuilder.scalar(
                ExtendedScalars.GraphQLLong
            )
        }
    }
}
