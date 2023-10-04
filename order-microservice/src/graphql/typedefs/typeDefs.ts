import gql from "graphql-tag";

export const orderTypeDef = gql`#graphql
    extend schema @link(url: "https://specs.apollo.dev/federation/v2.0",  import: ["@key", "@external"])

    type Order @key(fields: "id"){
        id:String!
        user: String!
        products: [String!]!
    }

    type Query{
        getOrder(id: String!): Order
        getOrders: [Order]
    }
    type Mutation{
        createOrder(user: String!, products: [String!]!):Order
        clearOrders: Boolean
        
    }
`;