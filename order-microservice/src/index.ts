import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import express from "express";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4"
import gql from 'graphql-tag';


const typeDefs = gql`#graphql
  type User {
    id: String!
    email: String!
    name: String!
    secondName: String
    surName: String!
    secondSurname: String
    dir: String!
  }

  type Product{
    id: String!
    name: String!
    value: Float!
    description: String
    iva: Float!
  }

  input UserInput {
    id: String!
    email: String!
    name: String!
    secondName: String
    surName: String!
    secondSurname: String
    dir: String!
  }

  input ProductInput{
    id: String!
    name: String!
    value: Float!
    description: String
    iva: Float!
  }

  type Order{
    id: String!
    user: User!
    product: Product!
  }
  
  type Query{
    getOrder: Order

  }

  type Mutation{
    createOrder(user: UserInput!, product: ProductInput!): Order
  }
`;

const resolvers = {
    User: {
        __resolveReference(reference: any) {
            fetch('http://user-microservice:4000', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: `
                    query User {
                        user(id: "${reference}") {
                            id
                            email
                            name
                            secondName
                            surName
                            secondSurname
                            dir
                        }
                    }`
                }),
            })
                .then(res => res.json())
        },
    },
    Product: {
        __resolveReference(reference: any) {
            fetch('http://product-microservice:4000', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: `
                    query Product {
                        product(id: "${reference}") {
                            id
                            name
                            value
                            description
                            iva
                        }
                    }`
                }),
            })
                .then(res => res.json())
        },
        // Implement other resolvers for Product fields here
    },

    Query: {
        getOrder() {

        }
    },
    Mutation: {
        createOrder(_: any, args: Record<string, any>) {
            console.log(args.user)
            console.log(args.product)
        }
    }
};




const app = express();
const port = process.env.PORT || 4000;

const bootstrapServer = async () => {

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const server = new ApolloServer({
        schema: buildSubgraphSchema({
            typeDefs,
            resolvers,
        })
    });
    await server.start();

    app.use("/graphql", expressMiddleware(server));

    app.listen(port, () => {
        console.log(`🚀 Express ready at http://localhost:${port}`);
        console.log(`🚀 Graphql ready at http://localhost:${port}/graphql`);
    });
};

bootstrapServer();


