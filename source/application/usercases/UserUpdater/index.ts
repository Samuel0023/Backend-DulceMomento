import { UserAge, UserId, UserName, UserMail, UserContact, UserPassword } from '@domain/entities/user/valueObjects'
import { User } from '../../../domain/entities/user/User'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import { UserGetterById } from '../../../domain/services/UserGetterById'

interface UserInput {
  name?: string
  age?: number
  mail?: string
  id: string
  contact?: number
}

export class UserUpdaterUseCase {
  protected readonly _userResposiory: UserRepository
  protected readonly _userGetterById: UserGetterById

  constructor (userRepository: UserRepository) {
    this._userResposiory = userRepository
    this._userGetterById = new UserGetterById(userRepository)
  }

  async run (data: UserInput): Promise<User> {
    const user = await this._userGetterById.search(data.id)

    const dataToUpdate = User.create(
      new UserId(data.id),
      new UserName(data.name ?? user.name._value),
      new UserMail(data.mail ?? user.mail._value),
      new UserContact(data.contact ?? user.contact._value),
      new UserPassword(user.password._value),
      new UserAge(data.age ?? user.age?._value)
    )

    const userUpdated: User = await this._userResposiory.update(dataToUpdate)
    return userUpdated
  }
}
