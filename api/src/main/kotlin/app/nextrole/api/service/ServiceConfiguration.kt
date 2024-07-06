package app.nextrole.api.service

import app.nextrole.api.props.AwsProps
import app.nextrole.api.props.SupabaseProps
import com.amazonaws.auth.AWSCredentials
import com.amazonaws.auth.AWSStaticCredentialsProvider
import com.amazonaws.auth.BasicAWSCredentials
import com.amazonaws.regions.Regions
import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.AmazonS3ClientBuilder
import com.microsoft.playwright.Browser
import com.microsoft.playwright.BrowserType.LaunchOptions
import com.microsoft.playwright.Playwright
import io.github.jan.supabase.SupabaseClient
import io.github.jan.supabase.createSupabaseClient
import io.github.jan.supabase.gotrue.Auth
import io.github.jan.supabase.serializer.JacksonSerializer
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration


/**
 * @author Biz Melesse
 * created on 6/15/24
 */
@Configuration
@ComponentScan
class ServiceConfiguration(val awsProps: AwsProps,  val supabaseProps: SupabaseProps) {

    @Bean
    fun playWright(): Browser {
        val playwright = Playwright.create()
        return playwright.chromium().launch(LaunchOptions().setHeadless(true))
    }

    @Bean("s3-us-east-1")
    fun amazonS3USEast1(): AmazonS3 {
        return amazonS3ByRegion(Regions.US_EAST_1)
    }

    fun amazonS3ByRegion(region: Regions?): AmazonS3 {
        if (awsProps.accessKey != null && awsProps.secretKey != null) {
            val credentials: AWSCredentials = BasicAWSCredentials(
                awsProps.accessKey,
                awsProps.secretKey
            )
            return AmazonS3ClientBuilder
                .standard()
                .withCredentials(AWSStaticCredentialsProvider(credentials))
                .withRegion(region)
                .build()
        }
        // Assumes ECS environment. Container must have S3 role
        return AmazonS3ClientBuilder
            .standard()
            .withRegion(region)
            .build()
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
