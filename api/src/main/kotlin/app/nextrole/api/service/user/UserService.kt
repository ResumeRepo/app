package app.nextrole.api.service.user

import app.nextrole.api.SessionUser

/**
 * @author Biz Melesse
 * created on 3/17/24
 */
interface UserService {
    fun getOrCreateUser(): SessionUser
}
