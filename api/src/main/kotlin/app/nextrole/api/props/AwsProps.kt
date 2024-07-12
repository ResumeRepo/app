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
@ConfigurationProperties(prefix = "aws")
class AwsProps {
     var accessKey: String? = null
     var secretKey: String? = null
     var s3Bucket: String? = "nextrole"
     var s3CdnBucket: String? = "nextrole-cdn-source"
     var s3Region: String? = "us-east-1" // non-cdn content
     var s3RegionCdn: String? = "us-east-2"
     var cdn : String? = "https://d2xsoo5uzcm3hb.cloudfront.net"
}
