package app.nextrole.api.service.pdf

import app.nextrole.api.GenericResponse
import app.nextrole.api.PdfGenerateRequest
import app.nextrole.api.ResumeUploadRequest
import app.nextrole.api.SaveStyleRequest
import app.nextrole.api.data.postgres.entity.ResumeEntity
import app.nextrole.api.data.postgres.entity.TemplateStyleEntity
import app.nextrole.api.data.postgres.repo.TemplateStyleRepo
import app.nextrole.api.dto.TemplateStyle
import app.nextrole.api.service.utils.getSessionUser
import app.nextrole.api.service.utils.safeFile
import com.fasterxml.jackson.databind.ObjectMapper
import com.microsoft.playwright.Browser
import org.apache.pdfbox.Loader
import org.apache.pdfbox.pdmodel.interactive.form.PDCheckBox
import org.apache.pdfbox.pdmodel.interactive.form.PDComboBox
import org.apache.pdfbox.pdmodel.interactive.form.PDField
import org.apache.pdfbox.text.PDFTextStripper
import org.jsoup.Jsoup
import org.springframework.core.io.ClassPathResource
import org.springframework.core.io.Resource
import org.springframework.stereotype.Service
import java.io.File
import java.time.LocalDateTime
import java.util.*


@Service
class PdfServiceImpl(
    val browser: Browser,
    val templateStyleRepo: TemplateStyleRepo,
    val objectMapper: ObjectMapper
) : PdfService {

    override fun convertToPdf(pdfGenerateRequest: PdfGenerateRequest): ByteArray {
        val browserContext = browser.newContext()
        browserContext.use { context ->
            val page = context.newPage()
            val html = buildHtml(pdfGenerateRequest)
            page.setContent(html)
            if (pdfGenerateRequest.debug == true) {
                val path = File("out").absolutePath
                val fileName = "${path}/debugResume_${pdfGenerateRequest.templateId}"
                if (html != null) {
                    safeFile("${fileName}.html", html)
                }
            }
            return page.pdf()
        }
    }

    override fun saveStyle(saveStyleRequest: SaveStyleRequest): GenericResponse {
        var tse = saveStyleRequest.templateId?.let { templateStyleRepo.findByTemplateId(it) }
        if (tse == null) {
            tse = TemplateStyleEntity()
            tse.templateId = saveStyleRequest.templateId
            tse.updatedAt = LocalDateTime.now()
        }
        tse.css = objectMapper.writeValueAsString(TemplateStyle(css = saveStyleRequest.payload))
        templateStyleRepo.save(tse)
        return GenericResponse(status = "ok")
    }

    override fun parsePdf(file: ByteArray): String {
        val document = Loader.loadPDF(file)
        val stripper = PDFTextStripper()
        val text = stripper.getText(document)
        document.close()
        return text
    }


    private fun buildHtml(request: PdfGenerateRequest): String? {
        if (request.env.equals("production")) {
            val tse = request.templateId?.let { templateStyleRepo.findByTemplateId(it) }
            if (tse != null) {
                val styles: TemplateStyle = objectMapper.readValue(tse.css, TemplateStyle::class.java)
                val doc = request.data?.let { Jsoup.parse(it) }
                if (doc != null && styles.css != null) {
                    styles.css!!.map { entry ->
                        doc.head().append("<style id=${entry["id"]}>${entry["css"]}</style>");
                    }
                    return doc.html()
                }
            }
        }
        return request.data
    }
}
