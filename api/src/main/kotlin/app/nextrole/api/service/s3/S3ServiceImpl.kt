package app.nextrole.api.service.s3

import com.amazonaws.regions.Regions
import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.model.*
import com.amazonaws.util.IOUtils
import io.github.oshai.kotlinlogging.KotlinLogging
import org.apache.http.HttpStatus
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.stereotype.Service
import java.io.IOException
import java.io.InputStream
import java.time.Instant
import java.util.*

@Service
class S3ServiceImpl(
    @Qualifier("s3-us-east-1") val amazonS3ue1: AmazonS3,
    @Qualifier("s3-us-east-2") val amazonS3ue2: AmazonS3
) : S3Service {
    private val logger = KotlinLogging.logger {}
    val clients = mapOf(Regions.US_EAST_1 to amazonS3ue1, Regions.US_EAST_2 to amazonS3ue2 )

    override fun putObject(bucket: String?, key: String?, content: String?, region: Regions): PutObjectResult {
        return clients[region]!!.putObject(bucket, key, content)
    }

    override fun putObject(
        bucket: String?,
        key: String?,
        stream: InputStream?,
        contentType: String?,
        region: Regions
    ) {
        try {
            val meta = ObjectMetadata()
            meta.contentLength = stream!!.available().toLong()
            meta.contentType = contentType
            clients[region]!!.putObject(
                PutObjectRequest(
                    bucket, key, stream, meta
                )
                    .withCannedAcl(CannedAccessControlList.Private)
            )
            logger.info {
                "S3ServiceImpl.uploadContent Uploaded content with filename $key to S3"
            }
            stream.close()
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }

    override fun getObject(bucket: String?, key: String?, region: Regions): String? {
        val o: S3Object = clients[region]!!.getObject(bucket, key)
        val s3is = o.objectContent
        try {
            return String(s3is.readAllBytes())
        } catch (e: IOException) {
            e.printStackTrace()
        }
        return null
    }

    override fun objectExists(bucket: String?, key: String?, region: Regions): Boolean {
        return try {
            clients[region]!!.getObjectMetadata(bucket, key)
            true
        } catch (e: AmazonS3Exception) {
            e.statusCode != HttpStatus.SC_NOT_FOUND
        }
    }

    override fun getObjectByteContent(bucket: String?, key: String?, region: Regions): ByteArray? {
        try {
            clients[region]!!.getObject(bucket, key).use { s3Object ->
                return IOUtils.toByteArray(
                    s3Object.objectContent
                )
            }
        } catch (e: IOException) {
            logger.error {  "S3ServiceImpl.getObjectByteContent - Failed to parse the given object to an image: " + e.message }
            return null
        } finally {
            IOUtils.closeQuietly(null, null)
        }
    }

    override fun getSignedUrl(bucket: String?, key: String?, ttl: Long?, region: Regions): String? {
        val presignedUrlRequest = GeneratePresignedUrlRequest(
            bucket,
            key
        )
            .withExpiration(
                Date(
                    System.currentTimeMillis() +
                            ttl!! * 1000
                )
            )
        try {
            return clients[region]!!.generatePresignedUrl(presignedUrlRequest).toString()
        } catch (e: Exception) {
           logger.error {
               "Error in S3ServiceImpl.getSignedUrl bucket=${bucket} key=${key} ttl=${ttl}: $e.localizedMessage{}"
           }
        }
        return ""
    }
}
