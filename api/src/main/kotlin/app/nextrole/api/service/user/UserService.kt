package app.nextrole.api.service.user

import app.nextrole.api.*

/**
 * @author Biz Melesse
 * created on 6/15/24
 */
interface UserService {
    fun getOrCreateUser(): SessionUser
    suspend fun signIn(stringValue: StringValue): GenericResponse
    suspend fun guestSignIn(userInfo: Map<String, Any>): SessionUserResponse
    suspend fun confirmOtp(otpConfirmation: OtpConfirmation): SessionUserResponse
}
