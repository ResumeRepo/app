package app.nextrole.api.utils.mapper

import com.fasterxml.jackson.core.JsonGenerator
import com.fasterxml.jackson.databind.JsonSerializer
import com.fasterxml.jackson.databind.SerializerProvider
import java.io.IOException
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

/**
 * @author Biz Melesse
 * created on 6/15/24
 */

class LocalDateTimeSerializer : JsonSerializer<LocalDateTime>() {
    @Throws(IOException::class)
    override fun serialize(
        localDateTime: LocalDateTime,
        jsonGenerator: JsonGenerator,
        serializerProvider: SerializerProvider?
    ) {
        jsonGenerator.writeString(localDateTime.format(FORMATTER))
    }

    companion object {
        val FORMATTER: DateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSSSSS +00:00")
    }
}
