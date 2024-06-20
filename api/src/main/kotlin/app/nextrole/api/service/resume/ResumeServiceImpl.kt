package app.nextrole.api.service.resume

import app.nextrole.api.*
import app.nextrole.api.data.postgres.entity.BaseResumeEntity
import app.nextrole.api.data.postgres.repo.BaseResumeRepo
import app.nextrole.api.data.postgres.repo.ResumeRepo
import app.nextrole.api.data.postgres.repo.UserRepo
import app.nextrole.api.service.pdf.PdfService
import app.nextrole.api.service.utils.getSessionUser
import org.springframework.core.io.Resource
import org.springframework.stereotype.Service
import java.io.File
import java.util.*

@Service
class ResumeServiceImpl(
    val resumeRepo: ResumeRepo,
    val baseResumeRepo: BaseResumeRepo,
    val pdfService: PdfService
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

    override fun uploadResume(resumeUploadRequest: ResumeUploadRequest): ResumeUploadResponse {
        val sessionUser = getSessionUser()

        val parts = resumeUploadRequest.file?.split(",", limit = 2)
        val contentType = parts?.get(0)?.substringAfter("data:")
        val base64Payload = parts?.get(1)
        val decoder = Base64.getDecoder()
        val file = decoder.decode(base64Payload)

        // TODO: upload to s3 here
        val uploaded = File("out/${sessionUser.userId}_upload.pdf")
        uploaded.writeBytes(file)

        val text = pdfService.parsePdf(file)
        val baseResume = BaseResumeEntity()
        baseResume.resume = text
        baseResume.userId = sessionUser.userId
        baseResume.pdfS3Url = ""
//        baseResumeRepo.save(baseResume)
        return ResumeUploadResponse(resumeId = baseResume.uid)
    }

    override fun hasBaseResume(): GenericResponse {
        val baseResume = getSessionUser().userId?.let { baseResumeRepo.findByUserId(it) }
        return GenericResponse(status = "ok", value = baseResume != null)
    }
}
