package app.nextrole.api.data.postgres.repo

import app.nextrole.api.data.postgres.entity.ApplicationEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional

/**
 * @author Biz Melesse
 * created on 3/17/24
 */

@Repository
@Transactional
interface ApplicationRepo : JpaRepository<ApplicationEntity, Long> {
}
