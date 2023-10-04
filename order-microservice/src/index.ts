import { ApolloServer } from '@apollo/server';
import express from "express";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4"
import { buildSubgraphSchema } from '@apollo/subgraph';
import { resolvers, typeDefs } from './graphql';
import { connectDb } from './services/mongo.service';



const app = express();
const port = process.env.PORT || 4000;


connectDb()
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


