import { Model, Schema, Document, model } from "mongoose";

export interface IProduct {
    //_id: string
    name: string
    value: number
    description: string
    iva: number
}

interface IProductDocument extends IProduct, Document{}

interface IProductModel extends Model<IProductDocument>{
    buildUser(args: IProduct): IProductDocument
}

const ProductSchema: Schema<IProductDocument> = new Schema({
    name: {type: String, required: true},
    value: {type: Number, required: true, min: 0},
    description: {type: String},
    iva: {type: Number, required: true, max:1, min:0}
})

ProductSchema.statics.buildProduct = (args: IProduct) =>{
    return new Product(args)
}
const Product = model<IProductDocument, IProductModel>("products", ProductSchema)

export default Product

