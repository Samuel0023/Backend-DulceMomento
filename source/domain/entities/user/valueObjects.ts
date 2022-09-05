import { Uuid } from '@domain/valueObjects/Uuid'
import {
  InvalidUserAge,
  AgeNotProvided,
  PasswordNotProvided,
  ContactNotProvided
} from './exceptions'

export class UserId extends Uuid {
  constructor (value: string) {
    super(value)
  }
}

export class UserName {
  readonly _value: string

  constructor (value: string) {
    this._value = value
  }
}

export class UserMail {
  readonly _value: string

  constructor (value: string) {
    this._value = value
  }
}

export class UserAge {
  readonly _value: number

  constructor (value?: number) {
    if (value === undefined) throw new AgeNotProvided()

    if (value < 0 || value > 125) throw new InvalidUserAge()

    this._value = value
  }
}

export class UserContact {
  readonly _value: number

  constructor (value?: number) {
    if (value === undefined) throw new ContactNotProvided()

    this._value = value
  }
}

export class UserPassword {
  readonly _value: string

  constructor (value?: string) {
    if (value === undefined) throw new PasswordNotProvided()

    this._value = value
  }
}
