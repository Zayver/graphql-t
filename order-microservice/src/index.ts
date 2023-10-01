import { ApolloServer } from '@apollo/server';
import express from "express";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4"
import { buildSubgraphSchema } from '@apollo/subgraph';
import gql from 'graphql-tag';


const typeDefs = gql`#graphql
    extend schema @link(url: "https://specs.apollo.dev/federation/v2.0",  import: ["@key", "@external"])

    extend type User @key(fields:"id"){
        id: String! @external
    }

    extend type Product @key(fields:"id"){
        id: String! @external
    }

    type Order @key(fields: "id"){
        id:String!
        user: User!
        products: [Product!]!
    }

    type Query{
        getOrder(id: String!): Order
    }
`;

const resolvers = {
    Order: {

        __resolveReference(order: any) {

            //return fetchUserById(user.id);

        },

    }
};




const app = express();
const port = process.env.PORT || 4002;

const bootstrapServer = async () => {

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const server = new ApolloServer({
        schema: buildSubgraphSchema({
            typeDefs,
            resolvers
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


