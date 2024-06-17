package app.nextrole.api.service.form

import com.fasterxml.jackson.databind.ObjectMapper
import org.apache.pdfbox.Loader
import org.apache.pdfbox.pdmodel.interactive.form.PDButton
import org.apache.pdfbox.pdmodel.interactive.form.PDCheckBox
import org.apache.pdfbox.pdmodel.interactive.form.PDComboBox
import org.apache.pdfbox.pdmodel.interactive.form.PDField
import org.springframework.core.io.ClassPathResource
import org.springframework.stereotype.Service


@Service
class FormServiceImpl(private val objectMapper: ObjectMapper) : FormService {
    override fun practice() {
        val classPathResource = ClassPathResource("forms/i-129f.pdf")
        val document = Loader.loadPDF(classPathResource.getInputStream().readAllBytes())
        val acroForm = document.documentCatalog.acroForm
        val iter = acroForm.fieldIterator

        val fields = mutableListOf<PDField>()
        while(iter.hasNext()) {
            val field = iter.next()
            println("${field.partialName}: ${field.valueAsString}")
            fields.add(field)
        }
        for (field in fields) {
            println("Field Name Long: " + field.alternateFieldName)
            println("Field ID: " + field.fullyQualifiedName)
            println("Field Value: " + field.valueAsString)
            println("Field Type: " + field.fieldType)
            println("Field IsReadOnly: " + field.isReadOnly)
            println("Field IsRequired: " + field.isRequired)
            println("-----------------------")
            if (field.fullyQualifiedName.contains("Pt1Line4_Checkboxes")) {
                val _field1 = field as PDCheckBox
                val x = 1
            } else if (field.fullyQualifiedName.contains("form1[0].#subform[0].Pt1Line8_State[0]")) {
                val _field1 = field as PDComboBox
                val x = 1
            }
        }

        acroForm.getField("form1[0].#subform[0].Pt1Line6a_FamilyName[0]").setValue("Sidshow Bob")
        (acroForm.getField("form1[0].#subform[0].Pt1Line4_Checkboxes[1]") as PDCheckBox).check()
        (acroForm.getField("form1[0].#subform[0].Pt1Line8_State[0]") as PDComboBox).setValue("AL")
        // Save filled PDF
        if (document.isEncrypted()) {
            try {
                document.isAllSecurityToBeRemoved = true
            } catch (e: Exception) {
                throw Exception("The document is encrypted and we can't decrypt it.", e)
            }
        }
        document.save("output.pdf")
        document.close()
        val x = 1
    }
}
