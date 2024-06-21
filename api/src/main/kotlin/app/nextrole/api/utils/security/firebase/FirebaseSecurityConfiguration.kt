package app.nextrole.api.utils.security.firebase

import com.fasterxml.jackson.databind.ObjectMapper
import app.nextrole.api.props.CorsProps
import app.nextrole.api.service.utils.getCurrentTime
import app.nextrole.api.utils.security.UnsecurePaths
import app.nextrole.api.utils.security.firewall.FirewallConfiguration
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.autoconfigure.security.reactive.ReactiveSecurityAutoConfiguration
import org.springframework.boot.web.servlet.FilterRegistrationBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Import
import org.springframework.core.Ordered
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configurers.*
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.AuthenticationEntryPoint
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.filter.CorsFilter

/**
 * @author Biz Melesse
 * created on 6/15/24
 */

@EnableWebSecurity
@EnableAutoConfiguration(exclude = [ReactiveSecurityAutoConfiguration::class])
@Import(
    FirewallConfiguration::class
)
@ComponentScan
class FirebaseSecurityConfiguration(
    private val securityFilter: SecurityFilter,
    private val objectMapper: ObjectMapper,
    private val corsProps: CorsProps,
    private val unsecurePaths: UnsecurePaths
) {

    @Bean
    @Throws(Exception::class)
    fun filterChain(http: HttpSecurity, authenticationEntryPoint: AuthenticationEntryPoint): SecurityFilterChain {
        http.cors { obj: CorsConfigurer<HttpSecurity> -> obj.disable() }
            .csrf { obj: CsrfConfigurer<HttpSecurity> -> obj.disable() }
            .formLogin { obj: FormLoginConfigurer<HttpSecurity> -> obj.disable() }
            .httpBasic { obj: HttpBasicConfigurer<HttpSecurity> -> obj.disable() }
            .exceptionHandling { ex -> ex.authenticationEntryPoint(authenticationEntryPoint) }
            .authorizeHttpRequests { auth ->
                auth
                    .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                    .requestMatchers(*unsecurePaths.wildcardPaths()).permitAll()
                    .anyRequest().authenticated()
            }
            .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter::class.java)
            .sessionManagement { sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS) }
        return http.build()
    }

    @Bean
    fun corsConfigurationSource(): FilterRegistrationBean<CorsFilter> {
        val corsConfiguration = CorsConfiguration()
        corsConfiguration.allowedHeaders = listOf("*")
        corsConfiguration.setAllowedOriginPatterns(
            corsProps.allowedOriginPatterns
                .stream()
                .toList()
        )
        corsConfiguration.setAllowedMethods(listOf("*"))
        corsConfiguration.exposedHeaders = listOf("*")
        corsConfiguration.allowCredentials = true
        corsConfiguration.maxAge = 3600L
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", corsConfiguration)
        val filter = FilterRegistrationBean(CorsFilter(source))
        filter.order = Ordered.HIGHEST_PRECEDENCE
        return filter
    }

    @Bean
    fun restAuthenticationEntryPoint(): AuthenticationEntryPoint {
        return AuthenticationEntryPoint { _: HttpServletRequest, httpServletResponse: HttpServletResponse, _: AuthenticationException ->
            val errorObject: MutableMap<String, Any> =
                HashMap()
            val errorCode = 401
            errorObject["error"] = "Unauthorized"
            errorObject["code"] = errorCode
            errorObject["timestamp"] = getCurrentTime()
            httpServletResponse.contentType = "application/json;charset=UTF-8"
            httpServletResponse.status = errorCode
            httpServletResponse.writer.write(objectMapper.writeValueAsString(errorObject))
        }
    }
}

