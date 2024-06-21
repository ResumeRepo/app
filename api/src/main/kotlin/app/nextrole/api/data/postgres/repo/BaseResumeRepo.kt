package app.nextrole.api.data.postgres.repo

import app.nextrole.api.data.postgres.entity.BaseResumeEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional

/**
 * @author Biz Melesse
 * created on 6/15/24
 */

@Repository
@Transactional
interface BaseResumeRepo : JpaRepository<BaseResumeEntity, Long> {

        @Query(
        value = "SELECT * "
                + "FROM public.base_resume br "
                + "JOIN public.user u ON u.uid = br.user_id "
                + "WHERE u.uid = ?1", nativeQuery = true
        )
    fun findByUserId(uid: String): BaseResumeEntity?
}
