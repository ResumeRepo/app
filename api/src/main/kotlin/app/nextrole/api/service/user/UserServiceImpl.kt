package app.nextrole.api.service.user

import app.nextrole.api.UserProfile
import app.nextrole.api.data.postgres.entity.UserEntity
import app.nextrole.api.data.postgres.repo.UserRepo
import org.springframework.stereotype.Service

@Service
class UserServiceImpl(private val userRepo: UserRepo) : UserService {

    override fun findUserById(id: String): UserEntity? {
        return userRepo.findById(id).orElse(null)
    }

    override fun createUser(profile: UserProfile): UserEntity {
        val user = UserEntity()
        user.fullName = profile.name
        user.email = profile.email
        user.username = profile.username
        userRepo.save(user)
        return user
    }
}
