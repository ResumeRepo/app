package app.nextrole.api.data.postgres.repo

import app.nextrole.api.data.postgres.entity.UserEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional

/**
 * @author Biz Melesse
 * created on 3/17/24
 */

@Repository
@Transactional
interface UserRepo : JpaRepository<UserEntity, String> {
//    fun findByEmail(email: String?): UserEntity?
//
//    @Query(
//        value = "SELECT "
//                + "u.id as userid, "
//                + "u.email as email, "
//                + "u.full_name as name, "
//                + "u.avatar_url as avatar, "
//                + "u.username as username, "
//                + "a.api_key as apikey, "
//                + "e.max_execution_time as maxexecutiontime, "
//                + "e.max_cpu_time as maxcputime, "
//                + "e.max_memory_usage as maxmemoryusage, "
//                + "e.max_data_transfer as maxdatatransfer, "
//                + "e.max_http_calls as maxhttpcalls,"
//                + " e.max_invocations as maxinvocations, "
//                + "e.max_functions as maxfunctions, "
//                + "e.max_projects as maxprojects  " +
//                "FROM public.user u "
//                + "JOIN public.api_key a ON u.id = a.user_id "
//                + "JOIN public.entitlement e ON u.id = e.user_id "
//                + "WHERE a.api_key = ?1", nativeQuery = true
//    )
//    fun findByApiKey(apiKey: String?): UserProjection?
//
//    @Query(
//        value = "SELECT "
//                + "u.id as userid, "
//                + "u.email as email, "
//                + "u.full_name as name, "
//                + "u.avatar_url as avatar, "
//                + "u.username as username, "
//                + "e.max_execution_time as maxexecutiontime, "
//                + "e.max_cpu_time as maxcputime, "
//                + "e.max_memory_usage as maxmemoryusage, "
//                + "e.max_data_transfer as maxdatatransfer, "
//                + "e.max_http_calls as maxhttpcalls,"
//                + "e.max_invocations as maxinvocations, "
//                + "e.max_functions as maxfunctions, "
//                + "e.max_projects as maxprojects  " +
//                "FROM public.user u "
//                + "JOIN public.entitlement e ON u.id = e.user_id "
//                + "WHERE u.id = ?1", nativeQuery = true
//    )
//    fun findByProjectId(projectId: String?): UserProjection?
//
//    @Query(
//        value = "SELECT count(*)" +
//                "FROM public.user u "
//                + "WHERE u.username = ?1", nativeQuery = true
//    )
//    fun findUsernameCount(username: String?): Int?
}
