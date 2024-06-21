package app.nextrole.api.controller.resume

import app.nextrole.api.*
import app.nextrole.api.service.resume.ResumeService
import org.springframework.core.io.Resource
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

//    override fun uploadResume(file: Resource?): ResponseEntity<ResumeUploadResponse> {
//        return ResponseEntity.ok(resumeService.uploadResume(file))
//    }

//    override fun uploadResume(file: ByteArray?): ResponseEntity<ResumeUploadResponse> {
////        return super.uploadResume(file)
//        return ResponseEntity.ok(resumeService.uploadResume(file))
//    }

//    override fun uploadResume(file: String): ResponseEntity<ResumeUploadResponse> {
//        return ResponseEntity.ok(resumeService.uploadResume(file))
//    }

//    override fun uploadResume(file: ByteArray?): ResponseEntity<ResumeUploadResponse> {
//        return ResponseEntity.ok(resumeService.uploadResume(file))
//    }

    override fun uploadResume(resumeUploadRequest: ResumeUploadRequest): ResponseEntity<ResumeUploadResponse> {
        return ResponseEntity.ok(resumeService.uploadResume(resumeUploadRequest))
    }
    override fun hasBaseResume(): ResponseEntity<GenericResponse> {
        return ResponseEntity.ok(resumeService.hasBaseResume())
    }
}
