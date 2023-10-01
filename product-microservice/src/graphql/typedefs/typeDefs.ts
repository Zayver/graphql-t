import gql from "graphql-tag";

export const productTypeDef = gql`#graphql

    extend schema @link(url: "https://specs.apollo.dev/federation/v2.0",  import: ["@key"])

    type Product @key(fields: "id"){
        id: String!
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


    type Query{
        products: [Product]
        product(id: String!): Product
        productByName(name: String!): Product
    } 

    type Mutation{
        createProduct(product:ProductInput!): Product
        # updateUser(id:String!, user:UserUpdate!): User
        # deleteUser(id: String!): User
    }
`;