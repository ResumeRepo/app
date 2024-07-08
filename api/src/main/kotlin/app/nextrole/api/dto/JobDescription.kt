package app.nextrole.api.dto

import app.nextrole.api.JobPostJobDescriptionInner
import com.fasterxml.jackson.annotation.JsonProperty
import jakarta.validation.Valid

/**
 * @author Biz Melesse
 * created on 7/7/24
 */
data class JobDescription(
    @get:JsonProperty("job_title") var jobTitle: kotlin.String? = null,

    @get:JsonProperty("company_name") var companyName: kotlin.String? = null,

    @get:JsonProperty("company_info") var companyInfo: kotlin.String? = null,

    @get:JsonProperty("location") var location: kotlin.String? = null,

    @get:JsonProperty("salary") var salary: kotlin.String? = null,

    @get:JsonProperty("logo_url") var logoUrl: kotlin.String? = null,

    @get:JsonProperty("job_board") var jobBoard: kotlin.String? = null,

    @field:Valid
    @get:JsonProperty("job_description") var jobDescription: kotlin.collections.MutableList<JobPostJobDescriptionInner>? = null
)
