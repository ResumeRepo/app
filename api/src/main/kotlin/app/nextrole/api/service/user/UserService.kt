package app.nextrole.api.service.user

import app.nextrole.api.codegen.types.UserInput
import app.nextrole.api.data.postgres.entity.UserEntity

/**
 * @author Biz Melesse
 * created on 3/17/24
 */
interface UserService {
    fun findUserById(id: String): UserEntity?
    fun createUser(userInput: UserInput): UserEntity
}
