import Product from '../models/Product.js'

export async function addProduct (product) {
  return await Product.create(product)
}

export async function deleteProduct (id) {
  return await Product.findByIdAndDelete(id)
}
