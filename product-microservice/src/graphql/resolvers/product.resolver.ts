import { IProduct } from "../../model/product.model";
import { createProduct, getProductById, getProductByName, getProducts } from "../services/product.service";

export const productResolver = {
    Query: {
      async products() {
        return await getProducts();
      },
  
      async productByName(_: any, args: Record<string, any>){
        return await getProductByName(args.name)
      },
  
      async product(_: any, args: Record<string, any>){
        return await getProductById(args.id)
      }
  
    },
    Mutation:{
      async createProduct(_: any, args: Record<string, any>){
        return await createProduct(args.product as IProduct)
      }
        
    }
}