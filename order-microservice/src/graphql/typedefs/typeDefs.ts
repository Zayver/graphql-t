import gql from "graphql-tag";

export const orderTypeDef = gql`#graphql
    extend schema @link(url: "https://specs.apollo.dev/federation/v2.0",  import: ["@key", "@external"])

    extend type User @key(fields:"id"){
        id: ID! @external
    }

    extend type Product @key(fields:"id"){
        id: ID! @external
    }

    type Order{
        id:String!
        user: User!
        products: [Product!]!
    }

    type Query{
        getOrder(id: String!): Order
        getOrders: [Order]
    }
    type Mutation{
        createOrder(user: ID!, products: [ID!]!):Order
    }
`;