package app.nextrole.api.service.user

import app.nextrole.api.codegen.types.UserInput
import app.nextrole.api.data.postgres.entity.UserEntity
import app.nextrole.api.data.postgres.repo.UserRepo
import org.springframework.stereotype.Service

@Service
class UserServiceImpl(private val userRepo: UserRepo) : UserService {

    override fun findUserById(id: String): UserEntity? {
        return userRepo.findById(id).orElse(null)
    }

    override fun createUser(userInput: UserInput): UserEntity {
        val user = UserEntity()
        user.fullName = userInput.fullName
        user.email = userInput.email
        user.username = userInput.username
        userRepo.save(user)
        return user
    }
}
