package app.nextrole.api.service.resume

import app.nextrole.api.*
import app.nextrole.api.data.postgres.repo.ResumeRepo
import org.springframework.stereotype.Service

@Service
class ResumeServiceImpl(
    val resumeRepo: ResumeRepo
) : ResumeService {
    override fun getAllResumes(): ResumeList {
        TODO("Not yet implemented")
    }

    override fun updateResume(resumeUpdateRequest: ResumeUpdateRequest): GenericResponse {
        TODO("Not yet implemented")
    }

    override fun updateTemplateId(resumeTemplateUpdateRequest: ResumeTemplateUpdateRequest): GenericResponse {
//        val resume = resumeRepo.find;
        return GenericResponse("ok")
    }

    override fun getResume(resumeId: String?): ResumeData {
        TODO("Not yet implemented")
    }

    override fun uploadResume(resumeUploadRequest: ResumeUploadRequest): GenericResponse {
        TODO("Not yet implemented")
    }
}
