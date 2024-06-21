package app.nextrole.api.service.resume

import app.nextrole.api.*
import app.nextrole.api.data.postgres.entity.BaseResumeEntity
import app.nextrole.api.data.postgres.repo.BaseResumeRepo
import app.nextrole.api.data.postgres.repo.ResumeRepo
import app.nextrole.api.props.AwsProps
import app.nextrole.api.service.pdf.PdfService
import app.nextrole.api.service.s3.S3Service
import app.nextrole.api.service.utils.getSessionUser
import org.springframework.stereotype.Service
import java.io.ByteArrayInputStream
import java.io.File
import java.io.InputStream
import java.util.*

@Service
class ResumeServiceImpl(
    val resumeRepo: ResumeRepo,
    val baseResumeRepo: BaseResumeRepo,
    val pdfService: PdfService,
    val s3Service: S3Service,
    val awsProps: AwsProps
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


        val text = pdfService.parsePdf(file)
        val baseResume = BaseResumeEntity()
        baseResume.resume = text
        baseResume.userId = sessionUser.userId
        baseResume.pdfS3Url = ""
//        baseResumeRepo.save(baseResume)

        kotlinx.coroutines.runBlocking {
            sessionUser.userId?.let { uploadToS3(it, file, baseResume.id) }
        }

        return ResumeUploadResponse(resumeId = baseResume.uid)
    }

    override fun hasBaseResume(): GenericResponse {
        val baseResume = getSessionUser().userId?.let { baseResumeRepo.findByUserId(it) }
        return GenericResponse(status = "ok", value = baseResume != null)
    }

    suspend fun uploadToS3(userId: String, file: ByteArray, resumeId: Long?) {
        val uploaded = File("out/${userId}_upload.pdf")
        uploaded.writeBytes(file)

        val inputStream: InputStream = ByteArrayInputStream(file)
        val key = "${awsProps.s3UserContentFolder}/${userId}/${resumeId}.pdf"
        s3Service.putObject(awsProps.s3Bucket, key, inputStream, "application/pdf")

    }
}
