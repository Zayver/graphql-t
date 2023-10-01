import { productResolver } from "./resolvers/product.resolver";
import { productTypeDef } from "./typedefs/typeDefs";

export const resolvers = {
    Query: {
      ...productResolver.Query,
    },
    Mutation: {
      ...productResolver.Mutation,
    },
  };


export const typeDefs = [
    productTypeDef
]