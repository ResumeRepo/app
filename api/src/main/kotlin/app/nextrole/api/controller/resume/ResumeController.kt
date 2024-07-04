package app.nextrole.api.controller.resume

import app.nextrole.api.*
import app.nextrole.api.service.resume.ResumeService
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller


/**
 * @author Biz Melesse
 * created on 6/15/24
 */
@Controller
class ResumeController(
    val resumeService: ResumeService,
): ResumeApi {

    override suspend fun parsJobPost(parseJobPostRequest: ParseJobPostRequest): ResponseEntity<JobPost> {
        return ResponseEntity.ok(resumeService.parsJobPost(parseJobPostRequest))
    }

    override suspend fun generateResume(generateResumeRequest: GenerateResumeRequest): ResponseEntity<GeneratedResume> {
        return ResponseEntity.ok(resumeService.generateResume(generateResumeRequest))
    }

    override suspend fun getAllResumes(): ResponseEntity<ResumeList> {
        return ResponseEntity.ok(resumeService.getAllResumes())
    }

    override suspend fun updateResume(resumeUpdateRequest: ResumeUpdateRequest): ResponseEntity<GenericResponse> {
        return ResponseEntity.ok(resumeService.updateResume(resumeUpdateRequest))
    }

    override suspend fun updateTemplateId(resumeTemplateUpdateRequest: ResumeTemplateUpdateRequest): ResponseEntity<GenericResponse> {
        return ResponseEntity.ok(resumeService.updateTemplateId(resumeTemplateUpdateRequest))
    }

    override suspend fun getResume(resumeId: String?): ResponseEntity<ResumeData> {
        return ResponseEntity.ok(resumeService.getResume(resumeId))
    }

    override suspend fun uploadResume(resumeUploadRequest: ResumeUploadRequest): ResponseEntity<ResumeUploadResponse> {
        return ResponseEntity.ok(resumeService.uploadResume(resumeUploadRequest))
    }
    override suspend fun hasBaseResume(): ResponseEntity<GenericResponse> {
        return ResponseEntity.ok(resumeService.hasBaseResume())
    }
}
