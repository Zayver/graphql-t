import gql from "graphql-tag";

export const productTypeDef = gql`#graphql

    extend schema @link(url: "https://specs.apollo.dev/federation/v2.0",  import: ["@key"])

    type Product @key(fields: "id"){
        id: ID!
        name: String!
        value: Float!
        description: String
        iva: Float!
    }

    input ProductInput{
        name: String!
        value: Float!
        description: String
        iva: Float!
    }

    input ProductUpdate{
        name: String
        value: Float
        description: String
        iva: Float
    }



    type Query{
        products: [Product]
        product(id: ID!): Product
        productByName(name: String!): Product
    } 

    type Mutation{
        createProduct(product:ProductInput!): Product
        updateProduct(id:ID!, user:ProductUpdate!): Product
        deleteProduct(id: ID!): Product
    }
`;