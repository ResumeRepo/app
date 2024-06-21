package app.nextrole.api.service.user

import app.nextrole.api.SessionUser

/**
 * @author Biz Melesse
 * created on 6/15/24
 */
interface UserService {
    fun getOrCreateUser(): SessionUser
    fun exchangeToken(): SessionUser
}
