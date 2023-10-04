import { Model, Schema, Document, model } from "mongoose";


export interface IOrder {
    user: string
    products: string[]
}

interface IOrderDocument extends IOrder, Document{}

interface IOrderModel extends Model<IOrderDocument>{
    buildUser(args: IOrder): IOrderDocument
}

const OrderSchema: Schema<IOrderDocument> = new Schema({
    user:{type: String, required: true},
    products: {type: [], required: true, default: []},
})

OrderSchema.statics.buildOrder = (args: IOrder) =>{
    return new Order(args)
}
const Order = model<IOrderDocument, IOrderModel>("orders", OrderSchema)

export default Order

