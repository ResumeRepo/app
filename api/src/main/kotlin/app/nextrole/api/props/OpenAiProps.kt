package app.nextrole.api.props

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary

/**
 * @author Biz Melesse
 * created on 6/20/24
 */

@Primary
@Configuration
@ConfigurationProperties(prefix = "openai")
class OpenAiProps {
     var apiKey: String? = null
     var completionModel: String? = null
     var systemMessage: String? = null
     var completionEndpoint = "https://api.openai.com/v1/chat/completions"
     var temp = 0.7
     var maxTokens = 4096
     var requestTimeoutSeconds = 120
}
