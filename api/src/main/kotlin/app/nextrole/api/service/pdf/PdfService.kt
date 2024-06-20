package app.nextrole.api.service.pdf

import app.nextrole.api.GenericResponse
import app.nextrole.api.PdfGenerateRequest
import app.nextrole.api.ResumeUploadRequest
import app.nextrole.api.SaveStyleRequest
import org.springframework.core.io.Resource

/**
 * @author Biz Melesse
 * created on 6/19/24
 */
interface PdfService {
    fun convertToPdf(pdfGenerateRequest: PdfGenerateRequest): ByteArray
    fun saveStyle(saveStyleRequest: SaveStyleRequest): GenericResponse
    fun parsePdf(file: ByteArray): String
}
