package app.nextrole.api.utils.exception

import app.nextrole.api.props.SourceProps
import app.nextrole.api.service.utils.getCurrentTime
import com.fasterxml.jackson.databind.ObjectMapper
import io.github.oshai.kotlinlogging.KotlinLogging
import org.apache.coyote.BadRequestException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.context.request.WebRequest


/**
 * @author Biz Melesse
 * created on 6/19/24
 */

@ControllerAdvice
class GlobalExceptionHandler(
    val objectMapper: ObjectMapper,
    val sourceProps: SourceProps
) {
    private val logger = KotlinLogging.logger {}

    private fun getMessage(error: String, errorCode: Int): String {
        val errorObject: MutableMap<String, Any> = HashMap()
        var redactedError = error
        if (sourceProps.profile.equals("prod")) {
            redactedError = "Encountered an internal server error. We're looking into it!"
        }
        errorObject["error"] = redactedError
        errorObject["code"] = errorCode
        errorObject["timestamp"] = getCurrentTime()
        logger.error { error }
        return objectMapper.writeValueAsString(errorObject)
    }


    @ExceptionHandler(BadRequestException::class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    fun handleBadRequest(
        ex: BadRequestException,
        request: WebRequest?
    ): ResponseEntity<String> {
        return ResponseEntity<String>(ex.message?.let { getMessage(it, HttpStatus.BAD_REQUEST.value()) },
            HttpStatus.BAD_REQUEST)
    }

    @ExceptionHandler(Exception::class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    fun handleException(ex: Exception, request: WebRequest?): ResponseEntity<String> {
        ex.printStackTrace()
        return ResponseEntity<String>(ex.message?.let { getMessage(it, HttpStatus.INTERNAL_SERVER_ERROR.value()) },
            HttpStatus.INTERNAL_SERVER_ERROR)
    }
}
