package app.nextrole.api.utils.exception

import ch.qos.logback.classic.Level
import org.aspectj.lang.annotation.AfterThrowing
import org.aspectj.lang.annotation.Aspect
import org.springframework.scheduling.annotation.Async
import org.springframework.stereotype.Component
import java.lang.Exception

/**
 * @author Biz Melesse
 * created on 7/6/24
 */
@Aspect
@Component
class ServiceExceptionHandler {
    /**
     * Intercept uncaught exceptions thrown throughout the application. The place
     * where the exceptions are thrown can be in any of the packages and the
     * subpackages of those listed below.
     *
     *
     * When defining the pointcut expressions, we need to exclude this package
     * and the security package from app.nextrole.api. It's not clear
     * why Spring AOP fails to advise on the security package. Nevertheless, we
     * don't mind not advising the security package because those failures are
     * purely on the web layer and are exposed to the clients. The most essential
     * parts are failures outside of controllers, where they are not defined by
     * an HTTP request/response boundary. We would like to handle those by post-
     * processing them and posting the result to Slack or rethrowing them so they
     * can be handled by the global controller handler.
     *
     *
     * Note that we have to be explicit with the package names so that AOP can
     * process them without any ambiguity and without expanding the matching
     * to external libraries.
     *
     * @param exception
     */
    @AfterThrowing(pointcut = "" +
            "execution(* app.nextrole.api.service..*.*(..)) || " +
            "execution(* org.hibernate.exception..*.*(..)) || " +
            "execution(* org.postgresql.util.PSQLException..*.*(..))",
        throwing = "exception")
    fun uncaughtExceptionHandler(exception: Exception) {
        throw exception
    }
}
