package app.nextrole.api.utils.security.firewall

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.web.firewall.HttpFirewall
import org.springframework.security.web.firewall.StrictHttpFirewall

/**
 * @author Biz Melesse
 * created on 3/17/24
 */

@Configuration
class FirewallConfiguration {
    @Bean
    fun firewallOverride(): HttpFirewall {
        val firewall = StrictHttpFirewall()
        firewall.setAllowUrlEncodedSlash(true)
        firewall.setAllowSemicolon(true)
        firewall.setAllowBackSlash(true)
        firewall.setAllowNull(true)
        firewall.setAllowUrlEncodedDoubleSlash(true)
        firewall.setAllowUrlEncodedPercent(true)
        firewall.setUnsafeAllowAnyHttpMethod(true)
        firewall.setAllowUrlEncodedPeriod(true)
        return firewall
    }
}
