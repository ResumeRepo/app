package app.nextrole.api.dto

/**
 * @author Biz Melesse
 * created on 3/17/24
 */

class SessionUser {
    var email: String? = null
    var name: String? = null
    var userId: String? = null
    var avatar: String? = null
    var username: String? = null
    var anonymous = false
    var roles: Map<String, Boolean> = HashMap()
}
