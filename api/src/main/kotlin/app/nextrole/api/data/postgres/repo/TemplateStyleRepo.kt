package app.nextrole.api.data.postgres.repo

import app.nextrole.api.data.postgres.entity.TemplateStyleEntity
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
interface TemplateStyleRepo : JpaRepository<TemplateStyleEntity, Long> {
    fun findByTemplateId(templateId: String): TemplateStyleEntity?
}
