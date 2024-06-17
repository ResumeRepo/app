package app.nextrole.api.utils.mapper

import com.fasterxml.jackson.core.JsonParser
import com.fasterxml.jackson.core.JsonProcessingException
import com.fasterxml.jackson.databind.DeserializationContext
import com.fasterxml.jackson.databind.JsonDeserializer
import java.io.IOException
import java.time.LocalDateTime

/**
 * @author Biz Melesse
 * created on 3/17/24
 */

class LocalDateTimeDeserializer : JsonDeserializer<LocalDateTime?>() {
    @Throws(IOException::class, JsonProcessingException::class)
    override fun deserialize(
        jsonParser: JsonParser,
        deserializationContext: DeserializationContext?
    ): LocalDateTime {
        return LocalDateTime.parse(jsonParser.valueAsString, LocalDateTimeSerializer.FORMATTER)
    }
}
