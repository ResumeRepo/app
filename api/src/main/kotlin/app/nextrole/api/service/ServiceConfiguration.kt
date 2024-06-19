package app.nextrole.api.service

import com.microsoft.playwright.Browser
import com.microsoft.playwright.BrowserType.LaunchOptions
import com.microsoft.playwright.Playwright
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration


/**
 * @author Biz Melesse
 * created on 3/17/24
 */
@Configuration
@ComponentScan
class ServiceConfiguration {
    @Bean
    fun playWright(): Browser {
        val playwright = Playwright.create()
        return playwright.chromium().launch(LaunchOptions().setHeadless(true))
    }
}
