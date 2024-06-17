package app.nextrole.api.props

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary

/**
 * @author Biz Melesse
 * created on 3/17/24
 */

@Primary
@Configuration
@ConfigurationProperties(prefix = "firebase")
class FirebaseProps {
    var type: String? = null
    var projectId: String? = null
    var privateKeyId: String? = null
    var privateKey: String? = null
    var clientEmail: String? = null
    var clientId: String? = null
    var authUri: String? = null
    var tokenUri: String? = null
    var clientApiKey: String? = null
    var customTokenVerificationUrl: String? = null
    var passwordVerificationUrl: String? = null
    var clientX509CertUrl: String? = null
    var authProviderX509CertUrl: String? = null
}
