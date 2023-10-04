import { MongooseError } from "mongoose"
import Order from "../../model/order.model"
import { checkUserId } from "../../services/checker.service"

export const orderById = async (id: string) => {
    return await Order.findById(id)
}

export const getOrders = async () => {
    return await Order.find({})
}

export const createOrder = async (userId: string, productsId: string[]) =>{
    checkUserId(userId)
}