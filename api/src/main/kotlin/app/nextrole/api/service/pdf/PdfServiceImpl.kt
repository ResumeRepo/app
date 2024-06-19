package app.nextrole.api.service.pdf

import app.nextrole.api.GenericResponse
import app.nextrole.api.PdfGenerateRequest
import app.nextrole.api.SaveStyleRequest
import com.microsoft.playwright.Browser
import com.microsoft.playwright.Page.PdfOptions
import org.springframework.core.io.ByteArrayResource
import org.springframework.core.io.Resource
import org.springframework.stereotype.Service
import java.nio.charset.StandardCharsets
import java.nio.file.Path
import java.util.*


@Service
class PdfServiceImpl(val browser: Browser) : PdfService {

    override fun convertToPdf(pdfGenerateRequest: PdfGenerateRequest): Resource {
        val browserContext = browser.newContext()
        browserContext.use { context ->
            val page = context.newPage()
            page.setContent(buildHtml(pdfGenerateRequest))
            if (pdfGenerateRequest.debug == true) {
                return ByteArrayResource(page.pdf(
                    PdfOptions()
                        .setPath(Path.of("build/debug/debugResume${pdfGenerateRequest.templateId}.pdf"))
                        .setFormat(pdfGenerateRequest.format)
                ))
            }
            return ByteArrayResource(page.pdf(
                PdfOptions()
                    .setFormat(pdfGenerateRequest.format)))

        }
    }

    override fun saveStyle(saveStyleRequest: SaveStyleRequest): GenericResponse {
        TODO("Not yet implemented")
    }

    private fun buildHtml(request: PdfGenerateRequest): String? {
        val html = request.data?.fromBase64()
        if (request.env === "production") {

        }
        return html
    }

    fun String.fromBase64(): String {
        val decodedBytes = Base64.getDecoder().decode(this)
        return String(decodedBytes, StandardCharsets.UTF_8)
    }
}
