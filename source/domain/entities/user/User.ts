import { EntityRoot } from '../EntityRoot'
import { AgeNotProvided } from './exceptions'
import { UserAge, UserId, UserName, UserMail, UserContact} from './valueObjects'

interface PrimitiveData {
  id: string
  name: string
  usermail: string
  age?: number
  contact: number
  password: string
}

export class User extends EntityRoot<User, PrimitiveData> {
  readonly id: UserId
  readonly name: UserName
  readonly usermail: UserMail
  readonly age?: UserAge
  readonly contact: UserContact
  readonly password?: UserPassword

  constructor ({
    id,
    name,
    usermail,
    age,
    contact
  }: { id: UserId, name: UserName, usermail: UserMail, age?: UserAge, contact: UserContact}) {
    super()
    this.id = id
    this.name = name
    this.usermail = usermail
    this.age = age
    this.contact = contact
  }

  static create (id: UserId, name: UserName, usermail: UserMail, contact: UserContact, age?: UserAge): User {
    const user = new User({
      id,
      name,
      usermail,
      age,
      contact
    })

    return user
  }

  static fromPrimitives (plainData: { id: string, name: string, usermail: string, age?: number , contact: number}): User {
    return new User({
      id: new UserId(plainData.id),
      name: new UserName(plainData.name),
      usermail: new UserMail(plainData.usermail),
      age: new UserAge(plainData.age),
      contact: new UserContact(plainData.contact)
    })
  }

  toPrimitives (): PrimitiveData {
    return {
      id: this.id._value,
      name: this.name._value,
      usermail: this.usermail._value,
      age: this.age?._value,
      contact: this.contact._value
    }
  }

  isAdult (age?: number): boolean {
    if (age === undefined) {
      if (this.age?._value === undefined) {
        throw new AgeNotProvided()
      } else {
        return this.age._value >= 18
      }
    } else {
      return age >= 18
    }
  }

  getContact (): number {
    return this.contact._value
  }
}
