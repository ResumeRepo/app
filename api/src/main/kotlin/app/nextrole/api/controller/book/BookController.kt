package app.nextrole.api.controller.book

import app.nextrole.api.controller.Author
import app.nextrole.api.controller.Book
import org.springframework.graphql.data.method.annotation.Argument
import org.springframework.graphql.data.method.annotation.QueryMapping
import org.springframework.graphql.data.method.annotation.SchemaMapping
import org.springframework.stereotype.Controller


/**
 * @author Biz Melesse
 * created on 3/17/24
 */
@Controller
class BookController {

    @QueryMapping
    fun bookById(@Argument id: String?): Book? {
        return Book.getById(id!!)
    }

    @SchemaMapping
    fun author(book: Book): Author? {
        return Author.getById(book.authorId!!)
    }
}
