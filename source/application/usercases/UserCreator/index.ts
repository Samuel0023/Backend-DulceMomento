import { User } from '../../../domain/entities/user/User'
import { UserAge, UserId, UserName, UserMail, UserContact, UserPassword } from '../../../domain/entities/user/valueObjects'
import { UserRepository } from '../../../domain/repositories/UserRepository'
import { ExistUserByUserName } from '../../../domain/services/ExistUserByUserName'
import { UuidGenerator, BcryptEncryter } from '@domain/utils'
import { UserIsNotAnAdultException, UserAlreadyExistsException } from '@domain/exceptions'

interface UserInput {
  name: string
  age: number
  mail: string
  contact: number
  password: string
}

export class UserCreatorUseCase {
  private readonly _userResposiory: UserRepository
  private readonly _existUserByUserName: ExistUserByUserName
  private readonly _uuidGenerator: UuidGenerator
  private readonly _bcryptEncryter: BcryptEncryter

  constructor (userRepository: UserRepository, uuidGenerator: UuidGenerator, bcryptEncryter: BcryptEncryter) {
    this._userResposiory = userRepository
    this._uuidGenerator = uuidGenerator
    this._bcryptEncryter = bcryptEncryter
    this._existUserByUserName = new ExistUserByUserName(userRepository)
  }

  async run (params: UserInput): Promise<User> {
    const user = new User({
      id: new UserId(this._uuidGenerator.generate()),
      name: new UserName(params.name),
      usermail: new UserMail(params.mail),
      age: new UserAge(params.age),
      contact: new UserContact(params.contact),
      password: new UserPassword(this._bcryptEncryter.encryt(params.password))
    })

    const existUser: boolean = await this._existUserByUserName.run(user.usermail._value)

    if (existUser) throw new UserAlreadyExistsException()

    const isAnAdult = user.isAdult()
    if (!isAnAdult) throw new UserIsNotAnAdultException()

    const userCreated: User = await this._userResposiory.save(user)

    return userCreated
  }
}
