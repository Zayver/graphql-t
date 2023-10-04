import express from "express";
import cors from "cors";
import User, { IUser } from "./model/user.model";
import { connectDb } from "./services/mongo.service";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4"
import { typeDefs } from "./graphql/";
import { resolvers } from "./graphql";
import { buildSubgraphSchema } from "@apollo/subgraph";

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

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.post("/user", async (req, res) => {
    const user = new User(req.body as IUser)
    user.save()

    res.sendStatus(200)
  })
  app.get("/user", async (_, res) => {
    const data = User.find({})
    const r = await data.exec()
    res.send(r)
  })

  app.get("/user/getuser", async (req, res) => {
    const name = req.query.name
    const data = User.find({ name: name })
    const r = await data.exec()
    res.send(r)
  })



  app.listen(port, () => {
    console.log(`🚀 Express ready at http://localhost:${port}`);
    console.log(`🚀 Graphql ready at http://localhost:${port}/graphql`);
  });
};

bootstrapServer();


