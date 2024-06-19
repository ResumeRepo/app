package app.nextrole.api.service.pdf

import app.nextrole.api.GenericResponse
import app.nextrole.api.PdfGenerateRequest
import app.nextrole.api.SaveStyleRequest
import app.nextrole.api.service.utils.safeFile
import com.microsoft.playwright.Browser
import org.springframework.stereotype.Service


@Service
class PdfServiceImpl(val browser: Browser) : PdfService {

    override fun convertToPdf(pdfGenerateRequest: PdfGenerateRequest): ByteArray {
        val browserContext = browser.newContext()
        browserContext.use { context ->
            val page = context.newPage()
            val html = buildHtml(pdfGenerateRequest)
            page.setContent(html)
            if (pdfGenerateRequest.debug == true) {
                val path = "debugResume_${pdfGenerateRequest.templateId}"
                if (html != null) {
                    safeFile("${path}.html", html)
                }
                return page.pdf()
//                 page.pdf(
//                    PdfOptions()
//                        .setPath(Path.of("${path}.pdf"))
//                        .setFormat(pdfGenerateRequest.format)
//                )
            }
            return page.pdf()
//            return ByteArrayResource(page.pdf(
//                PdfOptions()
//                    .setFormat(pdfGenerateRequest.format)))

        }
    }

    override fun saveStyle(saveStyleRequest: SaveStyleRequest): GenericResponse {
        return GenericResponse(status = "NOT YET IMPLEMENTED")
    }

    private fun buildHtml(request: PdfGenerateRequest): String? {
        if (request.env === "production") {

        }
        return request.data
    }
}
