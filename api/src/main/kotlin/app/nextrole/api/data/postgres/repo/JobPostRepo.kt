package app.nextrole.api.data.postgres.repo

import app.nextrole.api.data.postgres.entity.JobPostEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional

/**
 * @author Biz Melesse
 * created on 6/15/24
 */

@Repository
@Transactional
interface JobPostRepo : JpaRepository<JobPostEntity, Long> {
    fun findByUid(uid: String): JobPostEntity?
}
