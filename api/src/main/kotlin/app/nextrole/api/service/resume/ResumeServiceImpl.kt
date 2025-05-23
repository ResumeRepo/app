package app.nextrole.api.service.resume

import app.nextrole.api.*
import app.nextrole.api.data.postgres.entity.BaseResumeEntity
import app.nextrole.api.data.postgres.entity.JobPostEntity
import app.nextrole.api.data.postgres.repo.BaseResumeRepo
import app.nextrole.api.data.postgres.repo.JobPostRepo
import app.nextrole.api.data.postgres.repo.ResumeRepo
import app.nextrole.api.props.AwsProps
import app.nextrole.api.service.gpt.GptService
import app.nextrole.api.service.pdf.PdfService
import app.nextrole.api.service.s3.S3Service
import app.nextrole.api.service.utils.*
import com.amazonaws.regions.Regions
import com.fasterxml.jackson.databind.ObjectMapper
import io.github.oshai.kotlinlogging.KotlinLogging
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import kotlinx.serialization.json.Json
import org.springframework.stereotype.Service
import java.io.ByteArrayInputStream
import java.io.InputStream
import java.util.*

@Service
class ResumeServiceImpl(
    val gptService: GptService,
    val resumeRepo: ResumeRepo,
    val jobPostRepo: JobPostRepo,
    val baseResumeRepo: BaseResumeRepo,
    val pdfService: PdfService,
    val s3Service: S3Service,
    val awsProps: AwsProps,
    val objectMapper: ObjectMapper
) : ResumeService {
    private val logger = KotlinLogging.logger {}

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


    override suspend fun uploadResume(resumeUploadRequest: ResumeUploadRequest): ResumeUploadResponse {
        val sessionUser = getSessionUser()
        val binaryData = getBinaryData(resumeUploadRequest.file)

        val text = pdfService.parsePdf(binaryData)
        val prevBaseResume = getSessionUser().userId?.let { baseResumeRepo.findByUserId(it) }
        var version = 0L
        if (prevBaseResume?.version != null) {
            version = prevBaseResume.version!! + 1L
        }
        val baseResume = BaseResumeEntity()
        val key = "resume/${sessionUser.userId}/v${version}${baseResume.uid}.pdf"
        baseResume.resume = text
        baseResume.userId = sessionUser.userId
        baseResume.version = version
        baseResume.s3Key = key
        withContext(Dispatchers.IO) {
            baseResumeRepo.save(baseResume)
        }
        uploadToS3(
            binaryData,
            key,
            "application/pdf",
            awsProps.s3Bucket!!,
            Regions.US_EAST_1
        )
        return ResumeUploadResponse(resumeId = baseResume.uid)
    }

    override fun hasBaseResume(): GenericResponse {
        val baseResume = getSessionUser().userId?.let { baseResumeRepo.findByUserId(it) }
        return GenericResponse(status = "ok", value = baseResume != null)
    }

    override suspend fun parsJobPost(parseJobPostRequest: ParseJobPostRequest): JobPost {
        val jobId = parseJobPostRequest.jobId
        val jobBoard = parseJobPostRequest.jobBoard
        var jobPostEntity: JobPostEntity? = null
        val user = getSessionUser()
        if (jobId != null && jobBoard != null) {
            jobPostEntity = withContext(Dispatchers.IO) {
                jobPostRepo.findByJobIdAndJobBoard(jobId, jobBoard)
            }
            if (jobPostEntity == null) { // TODO: add the option to regenerate
                val jd = parseJobPostRequest.jobDescription!!.replace("\n", "")
                val context =
                    "I operate a website that allows users to customize their resume based on the job description. Before they are allowed to start customizing, we need to show them the job description in a succinct manner. Provided below is the job description scraped from a job board. Your task is to parse out all the relevant information about the job. The salary field must specify a dollar value or range either as an hourly, weekly, monthly, or yearly rate. Please follow the descriptions of the individual fields, where applicable. JOB DESCRIPTION:\n$jd"
                val responseFormat = loadJson("gpt/jobPostResponseFormat.json")
                val response = gptService.gptCompletionRequest(context, responseFormat, user)
                if (!response.messages.isNullOrEmpty() && response.messages?.get(0)?.content != null) {
                    val jobPost = objectMapper.readValue(
                        response.messages!![0].content,
                        GptJobPost::class.java
                    )
                    val key = "logo/${generateUid()}"
                    uploadToS3(
                        getBinaryData(parseJobPostRequest.logo),
                        key,
                        "image/jpeg",
                        awsProps.s3CdnBucket!!,
                        Regions.US_EAST_2)
                    val logoUrl = "${awsProps.cdn}/$key"
                    jobPostEntity = JobPostEntity()
                    jobPostEntity.jobDescription = jobPost.jobDescriptionBulletPoints?.joinToString("\n" )
                    jobPostEntity.jobTitle = jobPost.jobTitle
                    jobPostEntity.jobId = parseJobPostRequest.jobId
                    jobPostEntity.jobBoard = parseJobPostRequest.jobBoard
                    jobPostEntity.location = jobPost.location
                    jobPostEntity.companyInfo = jobPost.aboutCompany
                    jobPostEntity.companyName = jobPost.companyName
                    jobPostEntity.salary = jobPost.salary
                    jobPostEntity.logoUrl = logoUrl
                    jobPostRepo.save(jobPostEntity)
                }
            }
        }
        if (jobPostEntity?.jobDescription != null) {
            val bullets = jobPostEntity?.jobDescription?.split("\n")
            val jd = mutableListOf<JobPostJobDescriptionInner>()
             bullets?.forEach { jd.add(JobPostJobDescriptionInner(isMatch = false, text = it)) }
            return JobPost(
                jobId = jobId,
                jobBoard = jobBoard,
                jobTitle = jobPostEntity?.jobTitle,
                companyName = jobPostEntity?.companyName,
                companyInfo = jobPostEntity?.companyInfo,
                salary = jobPostEntity?.salary,
                location = jobPostEntity?.location,
                logoUrl = jobPostEntity?.logoUrl,
                jobDescription = jd
            )
        }
        return JobPost()
    }

    override fun generateResume(generateResumeRequest: GenerateResumeRequest): GeneratedResume {
//        if (generateResumeRequest.jobId != null) {
//            val sessionUser = getSessionUser()
//            val baseResume = sessionUser.userId?.let { baseResumeRepo.findByUserId(it) }
//            if (baseResume != null) {
//                val jobPost = jobPostRepo.findByUid(generateResumeRequest.jobId!!)
//                if (jobPost != null) {
//                    var resume = resumeRepo.findByJobPostId(jobPost.id!!)
//                    if (resume == null) {
//                        resume = ResumeEntity()
//                        resume.baseResumeId = baseResume.uid
//                        resume.userId = sessionUser.userId
//                        resume.templateId = "1" // default the initial generated resume to template 1
//                        resume.jobPostId = jobPost.id
//                    }
//                    resume.resume = makeGptRequest(baseResume, jobPost, generateResumeRequest.instructions)
//                    resume.updatedAt = LocalDateTime.now()
//                    resumeRepo.save(resume)
//                }
//            }
//        }

        // TODO: NOT YET IMPLEMENTED
        return GeneratedResume()
    }

    suspend fun uploadToS3(file: ByteArray, key: String, contentType: String, bucket: String, region: Regions) {
        val inputStream: InputStream = ByteArrayInputStream(file)
        s3Service.putObject(bucket, key, inputStream, contentType, region)
        val signedUrl = s3Service.getSignedUrl(bucket, key, 7 * 24 * 3600, region)
        logger.info { "Signed Url: $signedUrl"}
    }

    private fun makeGptRequest(baseResume: BaseResumeEntity, jobPost: JobPostEntity, instructions: String?): String {
        var userInstructions = instructions
        if (instructions == null) {
            userInstructions =  "Not provided, skip."
        }
        val jobDescription = "Title: ${jobPost.jobTitle}\n Description: ${jobPost.jobDescription}"
        val context = "We operate a website to allow users to customize their resume based on the job description. Users have provided their resume with all the information that's needed. Your taks is this: 1) Based on the information provided, score how well the user's resume matches the job description on a scale of 1-10. 2) Make your best effort to increase the score to 10 by generating a new resume for the user using a professional, industry-specific langauge. To generate, use the user's resume as a source and your own knowledge about what is an acceptable extrapolation to add new information. The dates on the resume should not change but you may expand, modify, or enhance the responsibilities and accomplishements, expand the technical terms, keywords, and skills so it matches the job description better. Ensure the enhancements are not an outright lie but a logical extension of what the applicant may be able to accomplish. The generated resume will need to fit an 8.5x11in letter size paper. It is okay if you add a lot of information. The user can edit and remove extraneous information on the frontend. 3) After you have generated the resume, provide a new score for the generated resume. 4) Make a function call with the results.\n" +
                "\n" +
                "Additional information: If the user has provided extra instructions, please prioritize that when generating the resume. \n" +
                "\n" +
                "USER_INSTRUCTIONS:$userInstructions\n" +
                "USER_RESUME:${baseResume.resume}\n" +
                "JOB_DESCRIPTION:$jobDescription"
        val responseFormat = Json.parseToJsonElement(loadFile("gpt/resumeResponseFormat.json"))
        val response = gptService.gptCompletionRequest(context, responseFormat, getSessionUser())
        return "message received..."
    }

    private fun getBinaryData(file: String?): ByteArray {
        val parts = file?.split(",", limit = 2)
        val base64Payload = parts?.get(1)
        val decoder = Base64.getDecoder()
        return decoder.decode(base64Payload)
    }
}
