package app.nextrole.api.utils.firebase

import com.fasterxml.jackson.databind.ObjectMapper
import com.google.auth.oauth2.GoogleCredentials
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import app.nextrole.api.props.FirebaseProps
import app.nextrole.api.service.utils.decodeBase64
import jakarta.annotation.PostConstruct
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary
import java.io.ByteArrayInputStream
import java.io.IOException
import java.io.InputStream
import java.nio.charset.StandardCharsets
import java.util.*

/**
 * @author Biz Melesse
 * created on 6/15/24
 */

@Configuration
@ConditionalOnProperty(value = ["firebase.sdkEnabled"])
class FirebaseSDKConfig(val firebaseProps: FirebaseProps, val objectMapper: ObjectMapper) {

    @PostConstruct
    @Throws(IOException::class)
    fun firebaseInit() {
        val firebaseOptions: FirebaseOptions = FirebaseOptions.builder()
            .setCredentials(getFirebaseCredentials()).build()
        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(firebaseOptions)
        }
    }

    @Throws(IOException::class)
    fun getFirebaseCredentials(): GoogleCredentials {
        val jsonNode = objectMapper.createObjectNode()
        jsonNode.put("type", firebaseProps.type)
        jsonNode.put("project_id", firebaseProps.projectId)
        jsonNode.put("private_key_id", firebaseProps.privateKeyId)
        jsonNode.put("private_key", decodeBase64(firebaseProps.privateKey))
        jsonNode.put("client_email", firebaseProps.clientEmail)
        jsonNode.put("client_id", firebaseProps.clientId)
        jsonNode.put("auth_uri", firebaseProps.authUri)
        jsonNode.put("token_uri", firebaseProps.tokenUri)
        jsonNode.put("auth_provider_x509_cert_url", firebaseProps.authProviderX509CertUrl)
        jsonNode.put("client_x509_cert_url", firebaseProps.clientX509CertUrl)
        val inputStream: InputStream = ByteArrayInputStream(
            objectMapper.writeValueAsString(jsonNode).toByteArray(
                StandardCharsets.UTF_8
            )
        )
        return GoogleCredentials.fromStream(inputStream)
    }
}
