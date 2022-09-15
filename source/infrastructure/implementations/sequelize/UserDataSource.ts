import { UserRepository } from '@domain/repositories/UserRepository'
import { User } from '@domain/entities/user/User'
import UserDTO from '@domain/entities/user/UserDTO'
import UserModel from '@infrastructure/db/mysql/sequelize/models/userModel'
import { Nullable } from '@domain/Nullable'

export class UserDataSource implements UserRepository {
  public async getById (id: string): Promise<Nullable<User>> {
    const userModel = await UserModel.findOne({ where: { id } })
    let userResponse = null
    if (userModel != null) {
      userResponse = User.fromPrimitives(userModel)
    }
    return userResponse
  }

  public async getAll (): Promise<User[]> {
    const userModel: UserDTO[] = await UserModel.findAll()
    const usersResponse: User[] = []
    userModel.forEach(user => {
      usersResponse.push(User.fromPrimitives(user))
    })
    return usersResponse
  }

  public async save (user: User): Promise<User> {
    const userModel: UserDTO = await UserModel.create(user.toPrimitives())
    let usersResponse = null

    usersResponse = User.fromPrimitives(userModel)

    return usersResponse
  }

  public async getByUserMail (usermail: string): Promise<Nullable<User>> {
    const userModel = await UserModel.findOne({ where: { usermail } })
    let userResponse = null
    if (userModel != null) {
      userResponse = User.fromPrimitives(userModel)
    }
    return userResponse
  }

  public async update (user: User): Promise<Nullable<User>> {
    const data = user.toPrimitives()
    const users = await UserModel.update(data, { where: { id: user.id._value } })
    let userResponse = null
    if (users.length > 0) {
      userResponse = user
    }
    return userResponse
  }

  public async delete (user: User): Promise<void> {
    const userModel = await UserModel.findOne({ where: { id: user.id._value } })
    userModel.destroy()
  }

}
