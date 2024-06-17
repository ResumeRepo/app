package app.nextrole.api.controller

/**
 * @author Biz Melesse
 * created on 3/17/24
 */

@JvmRecord
data class Author(val id: String?, val firstName: String?, val lastName: String?) {

    companion object {
        private val authors: List<Author?> = listOf(
            Author("author-1", "Joshua", "Bloch"),
            Author("author-2", "Douglas", "Adams"),
            Author("author-3", "Bill", "Bryson")
        )

        fun getById(id: String): Author? {
            return authors.stream()
                .filter { author: Author? -> author!!.id == id }
                .findFirst()
                .orElse(null)
        }
    }
}
