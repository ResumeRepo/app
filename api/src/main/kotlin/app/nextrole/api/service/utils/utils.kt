package app.nextrole.api.service.utils

import app.nextrole.api.SessionUser
import com.google.gson.Gson
import kotlinx.serialization.json.JsonElement
import org.springframework.core.io.ClassPathResource
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.util.FileCopyUtils
import java.io.File
import java.io.IOException
import java.nio.charset.StandardCharsets
import java.time.LocalDateTime
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter
import java.util.*

/**
 * @author Biz Melesse
 * created on 6/15/24
 */
val SHORT_UID_LENGTH: Int = 8
const val LONG_UID_LENGTH = 16
const val API_KEY_LENGTH = 46

fun getRandomCharacter(): Char? {
    val random = Random()
    val uidAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoqprstuvwxyz0123456789"
    val index = random.nextInt(uidAlphabet.length)
    return uidAlphabet[index]
}

fun generateUid(length: Int): String? {
    val builder = StringBuilder()
    // An ID length of N gives 62^N unique IDs
    for (i in 0 until length) {
        builder.append(getRandomCharacter())
    }
    return builder.toString()
}

fun generateEntityId(prefix: String, length: Int = SHORT_UID_LENGTH): String {
    return prefix + generateUid(length)
}

fun getCurrentTime(): String {
    return LocalDateTime.now(ZoneOffset.UTC)
        .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
}

fun loadFile(path: String?): String {
    return try {
        val classPathResource = ClassPathResource(
            path!!
        )
        val binaryData = FileCopyUtils.copyToByteArray(classPathResource.getInputStream())
        String(binaryData, StandardCharsets.UTF_8)
    } catch (e: IOException) {
        throw RuntimeException(e)
    }
}

fun safeFile(path: String, data: String) {
     try {
         val file = File(path)
         file.writeBytes(data.toByteArray())
    } catch (e: IOException) {
        throw RuntimeException(e)
    }
}

fun getSessionUser(): SessionUser {
    return try {
        SecurityContextHolder.getContext().authentication.principal as SessionUser
    } catch (e: Exception) {
        SessionUser()
    }
}

fun decodeBase64(encoded: String?): String {
    return String(Base64.getDecoder().decode(encoded), StandardCharsets.UTF_8)
}

fun jsonElementToMap(element: JsonElement): MutableMap<String, Any>? {
    val map: MutableMap<String, Any> = mutableMapOf()
    // Use Gson or Moshi specific methods to convert element to a Map
    val tempMap = Gson().fromJson(element.toString(), Map::class.java) as MutableMap<String, Any>
    map.putAll(tempMap)
    return map
}
