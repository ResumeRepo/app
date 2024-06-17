package app.nextrole.api.dgs

import com.netflix.graphql.dgs.DgsComponent
import com.netflix.graphql.dgs.DgsRuntimeWiring
import graphql.scalars.ExtendedScalars
import graphql.schema.idl.RuntimeWiring


/**
 * @author Biz Melesse
 * created on 3/18/24
 */


@DgsComponent
class LongScalarRegistration {
    @DgsRuntimeWiring
    fun addScalar(builder: RuntimeWiring.Builder): RuntimeWiring.Builder {
        return builder.scalar(ExtendedScalars.GraphQLLong)
    }
}
