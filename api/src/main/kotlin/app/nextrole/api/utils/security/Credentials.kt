package app.nextrole.api.utils.security

import com.google.firebase.auth.FirebaseToken

/**
 * @author Biz Melesse
 * created on 3/17/24
 */

class Credentials {
    lateinit var authToken: String
    lateinit var decodedFirebaseToken: FirebaseToken
}
