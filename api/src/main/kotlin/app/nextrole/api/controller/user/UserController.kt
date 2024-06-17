package app.nextrole.api.controller.user

import app.nextrole.api.codegen.types.UserInput
import app.nextrole.api.data.postgres.entity.UserEntity
import app.nextrole.api.service.user.UserService
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.MutationMapping
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.stereotype.Controller


/**
 * @author Biz Melesse
 * created on 3/17/24
 */
@Controller
class UserController(private val userService: UserService) {

    @QueryMapping
    fun userById(@Argument id: String): UserEntity? {
        return userService.findUserById(id)
    }

    @MutationMapping
    fun createUser(@Argument user: UserInput): UserEntity {
       return userService.createUser(user)
    }
}
