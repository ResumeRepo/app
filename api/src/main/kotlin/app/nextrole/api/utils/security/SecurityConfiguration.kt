package app.nextrole.api.utils.security

import app.nextrole.api.utils.security.firebase.FirebaseSecurityConfiguration
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import

/**
 * @author Biz Melesse
 * created on 6/15/24
 */

@Configuration
@Import(
    FirebaseSecurityConfiguration::class,
)
class SecurityConfiguration
