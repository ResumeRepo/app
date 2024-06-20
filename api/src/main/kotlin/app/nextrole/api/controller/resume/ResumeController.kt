package app.nextrole.api.controller.resume

import app.nextrole.api.*
import app.nextrole.api.service.resume.ResumeService
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller


/**
 * @author Biz Melesse
 * created on 3/17/24
 */
@Controller
class ResumeController(
    val resumeService: ResumeService,
): ResumeApi {

    override fun getAllResumes(): ResponseEntity<ResumeList> {
        return ResponseEntity.ok(resumeService.getAllResumes())
    }

    override fun updateResume(resumeUpdateRequest: ResumeUpdateRequest): ResponseEntity<GenericResponse> {
        return ResponseEntity.ok(resumeService.updateResume(resumeUpdateRequest))
    }

    override fun updateTemplateId(resumeTemplateUpdateRequest: ResumeTemplateUpdateRequest): ResponseEntity<GenericResponse> {
        return ResponseEntity.ok(resumeService.updateTemplateId(resumeTemplateUpdateRequest))
    }

    override fun getResume(resumeId: String?): ResponseEntity<ResumeData> {
        return ResponseEntity.ok(resumeService.getResume(resumeId))
    }

    override fun uploadResume(resumeUploadRequest: ResumeUploadRequest): ResponseEntity<GenericResponse> {
        return ResponseEntity.ok(resumeService.uploadResume(resumeUploadRequest))
    }
}
