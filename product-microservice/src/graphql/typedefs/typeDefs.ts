export const productTypeDef = `#graphql
    type Product{
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

    input ProductInput{
        name: String
        value: Float
        description: String
        iva: Float
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