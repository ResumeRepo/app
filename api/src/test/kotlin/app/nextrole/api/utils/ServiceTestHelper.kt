package app.nextrole.api.utils

import app.nextrole.api.SessionUser
import org.mockito.Mockito
import org.springframework.core.io.ClassPathResource
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContext
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import org.springframework.util.FileCopyUtils
import org.springframework.util.ResourceUtils
import java.io.*
import java.nio.file.Files
import java.util.*

/**
 * @author Biz Melesse
 * created on 6/15/24
 */

@Service
class ServiceTestHelper {
    fun prepareSecurity(userId: String?) {
        val authentication = Mockito.mock(
            Authentication::class.java
        )
        val user = SessionUser()
        user.name = "TestNG User"
        user.email = "testuser@exampe.com"
        user.userId = userId ?: UUID.randomUUID().toString()
        Mockito.`when`(authentication.principal).thenReturn(user)
        val securityContext = Mockito.mock(SecurityContext::class.java)
        Mockito.`when`(securityContext.authentication).thenReturn(authentication)
        SecurityContextHolder.setContext(securityContext)
    }

    fun setSessionUser(sessionUser: SessionUser) {
        val authentication = Mockito.mock(
            Authentication::class.java
        )
        Mockito.`when`(authentication.principal).thenReturn(sessionUser)
        val securityContext = Mockito.mock(SecurityContext::class.java)
        Mockito.`when`(securityContext.authentication).thenReturn(authentication)
        SecurityContextHolder.setContext(securityContext)
    }

    fun loadFile(path: String?): String {
        var file: File? = null
        return try {
            file = ResourceUtils.getFile(path!!)
            try {
                String(Files.readAllBytes(file.toPath()))
            } catch (e: IOException) {
                throw RuntimeException(e)
            }
        } catch (e: FileNotFoundException) {
            throw RuntimeException(e)
        }
    }

    fun loadFromFile(path: String?): String {
        var resource: InputStream? = null
        resource = try {
            ClassPathResource(path!!).getInputStream()
        } catch (e: IOException) {
            throw RuntimeException(e)
        }
        try {
            BufferedReader(InputStreamReader(resource)).use { reader ->
                return FileCopyUtils.copyToString(
                    reader
                )
            }
        } catch (e: IOException) {
            throw RuntimeException(e)
        }
    }
}

