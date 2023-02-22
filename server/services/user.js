import UserModel from '../models/User.js'

export async function getUserByEmail (email) {
  return await UserModel.findOne({ email })
}
export async function getUserById (id) {
  return await UserModel.findOne({ _id: id })
}

export async function createUser (user) {
  return await UserModel.create(user)
}
