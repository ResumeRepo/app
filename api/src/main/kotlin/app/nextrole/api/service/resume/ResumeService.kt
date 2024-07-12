package app.nextrole.api.service.resume

import app.nextrole.api.*

/**
 * @author Biz Melesse
 * created on 6/19/24
 */
interface ResumeService {
    fun getAllResumes(): ResumeList
    fun updateResume(resumeUpdateRequest: ResumeUpdateRequest): GenericResponse
    fun updateTemplateId(resumeTemplateUpdateRequest: ResumeTemplateUpdateRequest): GenericResponse
    fun getResume(resumeId: String?): ResumeData
    suspend fun uploadResume(resumeUploadRequest: ResumeUploadRequest): ResumeUploadResponse
    fun hasBaseResume(): GenericResponse
    fun generateResume(generateResumeRequest: GenerateResumeRequest): GeneratedResume
    suspend fun parsJobPost(parseJobPostRequest: ParseJobPostRequest): JobPost
}
