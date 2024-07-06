package app.nextrole.api.utils.security

import app.nextrole.api.utils.security.web.WebSecurityConfiguration
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import

/**
 * @author Biz Melesse
 * created on 6/15/24
 */

@Configuration
@Import(
    WebSecurityConfiguration::class,
)
class SecurityConfiguration
