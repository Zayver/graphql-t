import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4"
import cors from "cors";
import express from "express";


const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
        subgraphs: [
            { name: 'users', url: process.env.USER_URL },
            { name: 'products', url: process.env.PRODUCT_URL },
            { name: 'order', url: process.env.ORDER_URL },
        ]
    })
});

const app = express();
const port = process.env.PORT || 4000;

const bootstrapServer = async () => {
    const server = new ApolloServer({ gateway });
    await server.start()

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/graphql", expressMiddleware(server));

    app.listen(port, () => {
        console.log(`🚀 Express ready at http://localhost:${port}`);
        console.log(`🚀 Graphql ready at http://localhost:${port}/graphql`);
    });
}


bootstrapServer();
