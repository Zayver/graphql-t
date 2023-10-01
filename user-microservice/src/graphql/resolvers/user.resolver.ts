import { createUser, deleteUser, getUserById, getUserByName, getUsers, updateUser } from "../services/user.service";
import { IUser } from "../../model/user.model";

export const userResolver = {
  Query: {
    async users() {
      return await getUsers();
    },

    async user(_: any, args: Record<string, any>){
      return await getUserById(args.id)
    },

    async userByName(_: any, args: Record<string, any>){
      return await getUserByName(args.name as string, args.surname)
    }

  },
  Mutation: {
    async createUser(_: any, args: Record<string, any>){
      return await createUser(args.user as IUser)
    },
    async updateUser(_:any, args:Record<string, any>){
      return await updateUser(args.id, args.user)
    },
    async deleteUser(_:any, args:Record<string, any>){
      return await deleteUser(args.id)
    }
  },
  User: {
    __resolveReference(user: any){
      return getUserById(user.id)
    }
  }
}