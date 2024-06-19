package app.nextrole.api.data.postgres.entity

import com.fasterxml.jackson.annotation.JsonProperty
import jakarta.persistence.*
import java.time.LocalDateTime

/**
 * @author Biz Melesse
 * created on 3/17/24
 */

@Entity
@Table(schema = "public", name = "application")
class ApplicationEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @Column(name = "user_id")
    var userId: Long? = null

    @Column(name = "job_title")
    var jobTitle: String? = null

    @JsonProperty("company_name")
    @Column(name = "company_name")
    var companyName: String? = null

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
    @JsonProperty("template_id")
    @Column(name = "template_id")
    var templateId: String? = null

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
