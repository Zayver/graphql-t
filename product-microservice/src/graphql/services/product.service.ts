import Product, { IProduct } from "../../model/product.model"

export const getProducts = async () => {
    return await Product.find({})
}

export const getProductByName = async (name: string) => {
    return await Product.find({name: name})
}

export const getProductById = async (id: string) => {
    return await Product.findById(id)
}


export const createProduct = async (product: IProduct) => {
    const nProduct = new Product(product)
    return await nProduct.save()
}

export const updateProduct = async (id:string, product: IProduct) => {
    return await Product.findOneAndUpdate({_id: id}, product)
}

export const deleteProdcut = async (id: string) => {
    return await Product.findByIdAndDelete(id)
}