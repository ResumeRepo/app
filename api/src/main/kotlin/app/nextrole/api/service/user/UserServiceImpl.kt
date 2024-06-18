package app.nextrole.api.service.user

import app.nextrole.api.SessionUser
import app.nextrole.api.data.postgres.entity.UserEntity
import app.nextrole.api.data.postgres.repo.UserRepo
import app.nextrole.api.service.utils.getSessionUser
import app.nextrole.api.utils.security.jwt.JwtService
import org.springframework.stereotype.Service

@Service
class UserServiceImpl(
    val userRepo: UserRepo,
    val jwtService: JwtService
) : UserService {
    override fun getOrCreateUser(): SessionUser {
        val user = getSessionUser()
        kotlinx.coroutines.runBlocking {
            createUserProfile(user)
        }
        return user
    }

    override fun exchangeToken(): SessionUser {
        val sessionUser = getSessionUser()
        val token = sessionUser.userId?.let { jwtService.generateToken(it) }
        sessionUser.token = token
        return sessionUser
    }

    suspend fun createUserProfile(user: SessionUser) {
        var userEntity = user.userId?.let { userRepo.findByUid(it) }
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

