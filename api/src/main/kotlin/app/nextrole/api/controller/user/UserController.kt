package app.nextrole.api.controller.user

import app.nextrole.api.*
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

    override suspend fun getUserprofile(): ResponseEntity<SessionUser> {
        return ResponseEntity.ok(userService.getOrCreateUser())
    }

    override suspend fun signIn(stringValue: StringValue): ResponseEntity<GenericResponse> {
        return ResponseEntity.ok(userService.signIn(stringValue))
    }

    override suspend fun confirmOtp(otpConfirmation: OtpConfirmation): ResponseEntity<SessionUserResponse> {
        return ResponseEntity.ok(userService.confirmOtp(otpConfirmation))
    }
}
