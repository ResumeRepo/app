package app.nextrole.api.service.s3

import com.amazonaws.services.s3.model.PutObjectResult
import java.io.InputStream

/**
 * @author Biz Melesse
 * created on 6/20/24
 */

interface S3Service {
    /**
     * Upload an object to S3
     *
     * @param bucket bucket
     * @param key filename
     * @param content data
     * @return
     */
    fun putObject(bucket: String?, key: String?, content: String?): PutObjectResult

    /**
     * Upload an object to S3
     *
     * @param bucket buckt
     * @param key filename
     * @param stream object stream to upload
     * @param contentType
     * @return
     */
    fun putObject(bucket: String?, key: String?, stream: InputStream?, contentType: String?)

    /**
     * Get any object specified by the bucket and key
     *
     * @param bucket
     * @param key
     * @return
     */
    fun getObject(bucket: String?, key: String?): String?

    /**
     * Returns true if the object exists
     *
     * @param bucket
     * @param key
     * @return
     */
    fun objectExists(bucket: String?, key: String?): Boolean

    /**
     * Get the byte array from the object specified by the bucket and key
     *
     * @param bucket
     * @param key
     * @return
     */
    fun getObjectByteContent(bucket: String?, key: String?): ByteArray?


    /**
     * Get a signed URL of an object
     *
     * @param bucket
     * @param key
     * @param ttl the validity period for the signing. After the TTL the object
     * would no longer be accessibly publicly. It would need to be
     * re-signed
     * @return
     */
    fun getSignedUrl(bucket: String?, key: String?, ttl: Long?): String?

//    /**
//     * Sign file urls on S3 so that they are temporarily publicly
//     * accessible
//     * @param unsignedUrls
//     * @return
//     */
//    fun getSignedUrls(
//        unsignedUrls: List<String?>?,
//        bucket: String?,
//        rootDir: String?,
//        ttl: Long?
//    ): List<String?>?
}

