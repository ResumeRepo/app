package app.nextrole.api

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.config.server.EnableConfigServer
import org.springframework.security.core.context.SecurityContextHolder

@EnableConfigServer
@SpringBootApplication
class Application

fun main(args: Array<String>) {
	SecurityContextHolder.setStrategyName(SecurityContextHolder.MODE_INHERITABLETHREADLOCAL)
	runApplication<Application>(*args)
}
