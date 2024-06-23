package app.nextrole.api.data.postgres.entity

import app.nextrole.api.service.utils.SHORT_UID_LENGTH
import app.nextrole.api.service.utils.generateUid
import com.fasterxml.jackson.annotation.JsonProperty
import jakarta.persistence.*
import java.time.LocalDateTime

/**
 * @author Biz Melesse
 * created on 6/15/24
 */

@Entity
@Table(schema = "public", name = "job_post")
class JobPostEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @Column(name = "uid")
    var uid: String? = generateUid(SHORT_UID_LENGTH)

    @Column(name = "job_id")
    var jobId: String? = null

    @Column(name = "job_title")
    var jobTitle: String? = null

    @JsonProperty("company_name")
    @Column(name = "company_name")
    var companyName: String? = null

    @JsonProperty("company_info")
    @Column(name = "company_info")
    var companyInfo: String? = null

    @JsonProperty("location")
    @Column(name = "location")
    var location: String? = null

    @Basic
    @JsonProperty("salary")
    @Column(name = "salary")
    var salary: String? = null

    @Basic
    @JsonProperty("logo_url")
    @Column(name = "logo_url")
    var logoUrl: String? = null

    @Basic
    @Column(name = "job_board")
    var jobBoard: String? = null

    @Basic
    @Column(name = "job_description")
    var jobDescription: String? = null

    @Basic
    @Column(name = "updated_at")
    var updatedAt = LocalDateTime.now()

    @Basic
    @Column(name = "created_at")
    var createdAt = LocalDateTime.now()
}
