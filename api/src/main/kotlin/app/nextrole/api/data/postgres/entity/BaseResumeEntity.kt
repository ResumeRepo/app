package app.nextrole.api.data.postgres.entity

import app.nextrole.api.service.utils.SHORT_UID_LENGTH
import app.nextrole.api.service.utils.generateUid
import com.fasterxml.jackson.annotation.JsonProperty
import jakarta.persistence.*
import java.time.LocalDateTime

/**
 * @author Biz Melesse
 * created on 3/17/24
 */

@Entity
@Table(schema = "public", name = "base_resume")
class BaseResumeEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @Column(name = "uid")
    var uid: String? = generateUid(SHORT_UID_LENGTH)

    @Column(name = "user_id")
    var userId: String? = null

    @Basic
    @JsonProperty("pdf_s3_url")
    @Column(name = "pdf_s3_url")
    var pdfS3Url: String? = null

    @Basic
    @Column(name = "resume")
    var resume: String? = null

    @Basic
    @Column(name = "updated_at")
    var updatedAt = LocalDateTime.now()

    @Basic
    @Column(name = "created_at")
    var createdAt = LocalDateTime.now()
}
