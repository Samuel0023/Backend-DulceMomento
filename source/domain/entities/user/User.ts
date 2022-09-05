import { EntityRoot } from '../EntityRoot'
import { AgeNotProvided } from './exceptions'
import { UserAge, UserId, UserName, UserMail, UserContact, UserPassword } from './valueObjects'

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
  readonly password: UserPassword
  mail: any

  constructor ({
    id,
    name,
    usermail,
    age,
    contact,
    password
  }: { id: UserId, name: UserName, usermail: UserMail, age?: UserAge, contact: UserContact, password: UserPassword}) {
    super()
    this.id = id
    this.name = name
    this.usermail = usermail
    this.age = age
    this.contact = contact
    this.password = password
  }

  static create (id: UserId, name: UserName, usermail: UserMail, contact: UserContact, password: UserPassword, age?: UserAge): User {
    const user = new User({
      id,
      name,
      usermail,
      age,
      contact,
      password
    })

    return user
  }

  static fromPrimitives (plainData: { id: string, name: string, usermail: string, age?: number, contact: number, password: string}): User {
    return new User({
      id: new UserId(plainData.id),
      name: new UserName(plainData.name),
      usermail: new UserMail(plainData.usermail),
      age: new UserAge(plainData.age),
      contact: new UserContact(plainData.contact),
      password: new UserPassword(plainData.password)
    })
  }

  toPrimitives (): PrimitiveData {
    return {
      id: this.id._value,
      name: this.name._value,
      usermail: this.usermail._value,
      age: this.age?._value,
      contact: this.contact._value,
      password: this.password._value
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
