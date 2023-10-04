import { orderById, getOrders, createOrder } from "../services/order.service"

export const orderResolver = {
    Query:{
        async getOrder(_: any, args: Record<string, any>){
            return await orderById(args.user)
        },

        async getOrders(){
            return await getOrders()
        }
    },
    Mutation:{
        async createOrder(_: any, args: Record<string, any>){
            return await createOrder(args.user, args.products)
        }        
    }
}