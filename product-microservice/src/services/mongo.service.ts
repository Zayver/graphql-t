import { connect } from "mongoose";

export const connectDb = async () => {
  try {
    await connect(process.env.MONGO_URL!, {auth: {username:process.env.MONGO_USER, password: process.env.MONGO_PASSWORD}});
    console.log("Mongodb connected");
  } catch (error) {
    throw new Error("Unable to connect to database")
  }
};
