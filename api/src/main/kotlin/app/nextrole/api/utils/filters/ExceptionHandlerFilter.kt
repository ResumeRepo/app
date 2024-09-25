package app.nextrole.api.utils.filters

import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import java.io.IOException


/**
 * @author Biz Melesse
 * created on 9/23/24
 */

@Component
class ExceptionHandlerFilter : OncePerRequestFilter() {
    @Throws(ServletException::class, IOException::class)
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        try {
            filterChain.doFilter(request, response)
        } catch (e: Exception) {
            logger.error("Error during filtering:", e)
            response.status = HttpServletResponse.SC_BAD_REQUEST
            response.writer.write("An error occurred while processing your request.")
        }
    }
}
