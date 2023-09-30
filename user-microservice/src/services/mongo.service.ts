import { connect } from "mongoose";

export const connectDb = async () => {
  try {
    await connect("mongodb://localhost:27017/", {auth: {username:"mongo", password: "mongo"}});
    console.log("Mongodb connected");
  } catch (error) {
    console.error(error);
  }
};
