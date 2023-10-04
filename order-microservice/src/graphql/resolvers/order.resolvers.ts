import { MongooseError } from "mongoose"
import { orderById, getOrders, createOrder, clearOrders } from "../services/order.service"
import { GraphQLError } from "graphql"

export const orderResolver = {
    Query: {
        async getOrder(_: any, args: Record<string, any>) {
            return await orderById(args.id)
        },

        async getOrders() {
            return await getOrders()
        }
    },
    Mutation: {
        async createOrder(_: any, args: Record<string, any>) {
            try {
                return await createOrder(args.user, args.products)
            } catch (e: any) {
                throw new GraphQLError(e.message, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        argumentName: 'id',
                    },

                });
            }
        },

        async clearOrders() {
            await clearOrders()
            return true
        }
    },
    Order: {
        __resolveReference(order: any) {
            return orderById(order.id)
        }
    }
}