import { UserUpdaterUseCase } from '.'
import { UserAge, UserId, UserName, UserMail, UserContact, UserPassword } from '@domain/entities/user/valueObjects'
import { User } from '@domain/entities/user/User'
import { UserRepository } from '@domain/repositories/UserRepository'
import { BcryptEncryter } from '@domain/utils'

interface UserInput {
  id: string
  password: string
}
export class UserUpdatePassword extends UserUpdaterUseCase {
  protected readonly _bcryptEncryter: BcryptEncryter
  constructor (userRepository: UserRepository, bcryptEncryter: BcryptEncryter) {
    super(userRepository)
    this._bcryptEncryter = bcryptEncryter
  }

  async run (data: UserInput): Promise<User> {
    const user = await this._userGetterById.search(data.id)

    const dataToUpdate = User.create(
      new UserId(data.id),
      new UserName(user.name._value),
      new UserMail(user.mail._value),
      new UserContact(user.contact._value),
      new UserPassword(this._bcryptEncryter.encryt(data.password)),
      new UserAge(user.age?._value)
    )

    const userUpdated: User = await this._userResposiory.update(dataToUpdate)
    return userUpdated
  }
}
