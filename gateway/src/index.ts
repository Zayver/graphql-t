import { ApolloGateway } from "@apollo/gateway";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4"
import cors from "cors";
import express from "express";


const gateway = new ApolloGateway({
    serviceList: [
        { name: "users", url: "http://localhost:4000" },
        { name: "products", url: "http://localhost:4001" },
        { name: "orders", url: "http://localhost:4002" },
    ]
});

const app = express();
const port = process.env.PORT || 4003;

const bootstrapServer = async () => {
    const server = new ApolloServer({ gateway });

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
