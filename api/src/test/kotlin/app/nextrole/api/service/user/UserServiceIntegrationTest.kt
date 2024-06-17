package app.nextrole.api.service.user

import app.nextrole.api.data.postgres.entity.UserEntity
import app.nextrole.api.data.postgres.repo.UserRepo
import app.nextrole.api.service.ServiceTestConfiguration
import app.nextrole.api.service.form.FormService
import app.nextrole.api.service.utils.generateEntityId
import app.nextrole.api.utils.ServiceTestHelper
import app.nextrole.api.utils.migration.FlywayPostgresMigration
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests

import org.testng.annotations.*
import java.lang.reflect.Method

/**
 * @author Biz Melesse
 * created on 3/17/24
 */

@SpringBootTest(classes = [ServiceTestConfiguration::class])
class UserServiceIntegrationTest: AbstractTestNGSpringContextTests() {
    @Autowired
    private lateinit var flywayPostgresMigration: FlywayPostgresMigration

    @Autowired
    private lateinit var userRepo: UserRepo

    @Autowired
    private lateinit var testHelper: ServiceTestHelper

    @Autowired
    private lateinit var formService: FormService

    @BeforeClass
    fun setup() {
        testHelper.prepareSecurity(null)
    }

    @AfterClass
    fun tearDown() {
    }

    @BeforeMethod
    fun beforeEachTest(method: Method) {
        flywayPostgresMigration.migrate(true)
        userRepo.deleteAll()
        logger.info("  Testcase: " + method.name + " has started")

    }

    @AfterMethod
    fun afterEachTest(method: Method) {
        logger.info("  Testcase: " + method.name + " has ended")
    }

    @Test
    fun createUserTest() {
        formService.practice()
        val user = UserEntity()
        user.uid = generateEntityId("u_")
        user.email = "hello@example.com"
        user.fullName = "Test User"
        userRepo.save(user)

        val users = userRepo.findAll()
        assert(users.size == 1)
        assert(users[0].email.equals("hello@example.com"))
        assert(users[0].fullName.equals("Test User"))
    }
}
