package app.nextrole.api.data.postgres.entity

import com.fasterxml.jackson.annotation.JsonProperty
import jakarta.persistence.*
import java.time.LocalDateTime

/**
 * @author Biz Melesse
 * created on 6/15/24
 */

@Entity
@Table(schema = "public", name = "user")
class UserEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @Column(name = "uid")
    var uid: String? = null

    @JsonProperty("username")
    @Column(name = "username")
    var username: String? = null

    @JsonProperty("avatar_url")
    @Column(name = "avatar_url")
    var avatarUrl: String? = null

    @Basic
    @JsonProperty("full_name")
    @Column(name = "full_name")
    var fullName: String? = null

    @Basic
    @JsonProperty("is_premium_user")
    @Column(name = "is_premium_user")
    var isPremiumUser = false

    @Basic
    @JsonProperty("anonymous")
    @Column(name = "anonymous")
    var anonymous = false

    @Basic
    @Column(name = "email")
    var email: String? = null

    @Basic
    @Column(name = "updated_at")
    var updatedAt = LocalDateTime.now()

    @Basic
    @Column(name = "created_at")
    var createdAt = LocalDateTime.now()
}
