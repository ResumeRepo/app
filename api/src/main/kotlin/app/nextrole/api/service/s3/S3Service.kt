package app.nextrole.api.service.s3

import com.amazonaws.regions.Regions
import com.amazonaws.services.s3.model.PutObjectResult
import com.amazonaws.services.s3.model.Region
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
    fun putObject(bucket: String?, key: String?, content: String?, region: Regions): PutObjectResult

    /**
     * Upload an object to S3
     *
     * @param bucket buckt
     * @param key filename
     * @param stream object stream to upload
     * @param contentType
     * @return
     */
    fun putObject(bucket: String?, key: String?, stream: InputStream?, contentType: String?, region: Regions)

    /**
     * Get any object specified by the bucket and key
     *
     * @param bucket
     * @param key
     * @return
     */
    fun getObject(bucket: String?, key: String?, region: Regions): String?

    /**
     * Returns true if the object exists
     *
     * @param bucket
     * @param key
     * @return
     */
    fun objectExists(bucket: String?, key: String?, region: Regions): Boolean

    /**
     * Get the byte array from the object specified by the bucket and key
     *
     * @param bucket
     * @param key
     * @return
     */
    fun getObjectByteContent(bucket: String?, key: String?, region: Regions): ByteArray?


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
    fun getSignedUrl(bucket: String?, key: String?, ttl: Long?, region: Regions): String?
}

