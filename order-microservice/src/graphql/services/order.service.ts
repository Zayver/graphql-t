import Order from "../../model/order.model"
import { checkUserId, checkProducts } from "../../services/checker.service"

export const orderById = async (id: string) => {
    const res = await Order.findById(id)
    return res
}

export const getOrders = async () => {
    return await Order.find({})
}

export const createOrder = async (userId: string, productsId: string[]) =>{
    checkUserId(userId)
    checkProducts(productsId)
    const t = new Order({user: userId, products: productsId})
    return await t.save()
}

export const clearOrders = async ()=>{
    Order.deleteMany({})
}