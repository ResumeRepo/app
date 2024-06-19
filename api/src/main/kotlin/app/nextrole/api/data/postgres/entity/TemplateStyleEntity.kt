package app.nextrole.api.data.postgres.entity

import com.fasterxml.jackson.annotation.JsonProperty
import jakarta.persistence.*
import java.time.LocalDateTime

/**
 * @author Biz Melesse
 * created on 3/17/24
 */

@Entity
@Table(schema = "public", name = "template_style")
class TemplateStyleEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @Basic
    @JsonProperty("template_id")
    @Column(name = "template_id")
    var templateId: String? = null

    @Basic
    @Column(name = "css")
    var css: String? = null

    @Basic
    @Column(name = "updated_at")
    var updatedAt = LocalDateTime.now()

    @Basic
    @Column(name = "created_at")
    var createdAt = LocalDateTime.now()
}
