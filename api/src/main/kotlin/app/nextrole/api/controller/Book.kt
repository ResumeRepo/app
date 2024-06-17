package app.nextrole.api.controller


/**
 * @author Biz Melesse
 * created on 3/17/24
 */

@JvmRecord
data class Book(val id: String?, val name: String?, val pageCount: Int?, val authorId: String?) {
    companion object {
        private val books: List<Book?> = listOf(
            Book("book-1", "Effective Java", 416, "author-1"),
            Book("book-2", "Hitchhiker's Guide to the Galaxy", 208, "author-2"),
            Book("book-3", "Down Under", 436, "author-3")
        )

        fun getById(id: String): Book? {
            return books.stream()
                .filter { book: Book? -> book!!.id == id }
                .findFirst()
                .orElse(null)
        }
    }
}
