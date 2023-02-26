import Product from '../models/Product.js'

export async function addProduct (product) {
  return await Product.create(product)
}
