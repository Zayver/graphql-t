import { userResolver } from "./resolvers/user.resolver";
import { userTypeDef } from "./typedefs/typeDef";

export const resolvers = {
    Query: {
      ...userResolver.Query,
    },
    Mutation: {
      ...userResolver.Mutation,
    },
  };


export const typeDefs = [
    userTypeDef
]