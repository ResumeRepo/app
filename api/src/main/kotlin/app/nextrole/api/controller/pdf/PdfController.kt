package app.nextrole.api.controller.pdf

import app.nextrole.api.*
import app.nextrole.api.service.pdf.PdfService
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller


/**
 * @author Biz Melesse
 * created on 6/15/24
 */
@Controller
class PdfController(
    val pdfService: PdfService,
): PdfApi {

    override suspend fun convertToPdf(pdfGenerateRequest: PdfGenerateRequest): ResponseEntity<ByteArray> {
        return ResponseEntity.ok(pdfService.convertToPdf(pdfGenerateRequest))
    }

    override suspend fun saveStyle(saveStyleRequest: SaveStyleRequest): ResponseEntity<GenericResponse> {
        return ResponseEntity.ok(pdfService.saveStyle(saveStyleRequest))
    }
}
