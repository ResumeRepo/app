package app.nextrole.api.controller.user

import app.nextrole.api.SessionUser
import app.nextrole.api.UserApi
import app.nextrole.api.service.user.UserService
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller


/**
 * @author Biz Melesse
 * created on 6/15/24
 */
@Controller
class UserController(
    val userService: UserService,
): UserApi {

    override fun getUserprofile(): ResponseEntity<SessionUser> {
        return ResponseEntity.ok(userService.getOrCreateUser())
    }

    override fun exchangeToken(): ResponseEntity<SessionUser> {
        return ResponseEntity.ok(userService.exchangeToken())
    }
}
