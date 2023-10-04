import gql from "graphql-tag";

export const userTypeDef = gql`#graphql
    extend schema @link(url: "https://specs.apollo.dev/federation/v2.0",  import: ["@key"])

    type User @key(fields:"id"){
        id: String!
        email: String!
        name: String!
        secondName: String
        surName: String!
        secondSurname: String
        dir: String!
    }
    input UserInput {
        email: String!
        name: String!
        secondName: String
        surName: String!
        secondSurname: String
        dir: String!
    }

    input UserUpdate {
        email: String
        name: String
        secondName: String
        surName: String
        secondSurname: String
        dir: String
    }

    type Query{
        user(id: String!): User
        users: [User]
        userByName(name: String!, surname: String): User
    } 

    type Mutation{
        createUser(user:UserInput!): User
        updateUser(id:String!, user:UserUpdate!): User
        deleteUser(id: String!): User
    }
`;