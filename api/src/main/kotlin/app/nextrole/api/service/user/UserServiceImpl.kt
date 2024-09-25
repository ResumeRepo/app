package app.nextrole.api.service.user

import app.nextrole.api.*
import app.nextrole.api.data.postgres.entity.UserEntity
import app.nextrole.api.data.postgres.repo.UserRepo
import app.nextrole.api.service.utils.generateUid
import app.nextrole.api.service.utils.getSessionUser
import app.nextrole.api.utils.security.jwt.JwtService
import io.github.jan.supabase.SupabaseClient
import io.github.jan.supabase.gotrue.OtpType
import io.github.jan.supabase.gotrue.auth
import io.github.jan.supabase.gotrue.providers.builtin.OTP
import org.springframework.stereotype.Service

@Service
class UserServiceImpl(
    val userRepo: UserRepo,
    val jwtService: JwtService,
    val supabase: SupabaseClient
) : UserService {

    override fun getOrCreateUser(): SessionUser {
        val user = getSessionUser()
        kotlinx.coroutines.runBlocking {
            createUserProfile(user)
        }
        return user
    }

    override suspend fun signIn(stringValue: StringValue): GenericResponse {
        try {
            supabase.auth.signInWith(OTP) {
                this.email = stringValue.value
            }

        } catch (e: Exception) {
            e.message
        }
        return GenericResponse(status = "ok")
    }

    override suspend fun guestSignIn(userInfo: Map<String, Any>): SessionUserResponse {
        val user = SessionUser(userId = "u_${generateUid()}", anonymous = true)
        createUserProfile(user)
        return SessionUserResponse(
            sessionUser = SessionUser(
                userId = user.userId,
                token = jwtService.generateToken(user.userId!!)
            )
        )
    }

    override suspend fun confirmOtp(otpConfirmation: OtpConfirmation): SessionUserResponse {
        supabase.auth.verifyEmailOtp(
            type = OtpType.Email.EMAIL,
            email = otpConfirmation.email!!,
            token = otpConfirmation.otp!!)
        val user = supabase.auth.currentUserOrNull()
        if (user != null) {
            return SessionUserResponse(
                sessionUser = SessionUser(
                    userId = user.id,
                    email = user.email,
                    token = jwtService.generateToken(user.id)
                )
            )
        }
        return SessionUserResponse(error = "User not found")
    }

    suspend fun createUserProfile(user: SessionUser) {
        var userEntity =  user.userId?.let { userRepo.findByUid(it) }
        if (userEntity == null) {
            userEntity = UserEntity()
            userEntity.uid = user.userId
            userEntity.fullName = user.name
            userEntity.email = user.email
            userEntity.avatarUrl = user.avatar
            userEntity.anonymous = user.anonymous == true
            userEntity.username = user.username
            userRepo.save(userEntity)
        }
    }
}

