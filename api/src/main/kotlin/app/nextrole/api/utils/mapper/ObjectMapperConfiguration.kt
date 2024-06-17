package app.nextrole.api.utils.mapper

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary
import java.time.LocalDateTime

/**
 * @author Biz Melesse
 * created on 3/17/24
 */

@Configuration
class ObjectMapperConfiguration {
    @Bean
    @Primary
    fun objectMapper(): ObjectMapper {
        val mapper = ObjectMapper()
        val javaTimeModule = JavaTimeModule()
        javaTimeModule.addSerializer(LocalDateTime::class.java, LocalDateTimeSerializer())
        javaTimeModule.addDeserializer(LocalDateTime::class.java, LocalDateTimeDeserializer())
        mapper.registerModule(javaTimeModule)
        mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL)
        return mapper
    }
}
