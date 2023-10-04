import { orderResolver } from "./resolvers/order.resolvers";
import { orderTypeDef } from "./typedefs/typeDefs";

export const resolvers = {
    Query: {
        ...orderResolver.Query,
    },
    Mutation: {
        ...orderResolver.Mutation,
    },
}

export const typeDefs = [
    orderTypeDef
]