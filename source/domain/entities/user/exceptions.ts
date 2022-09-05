import { Exception } from '@domain/exceptions/Exception'

export class InvalidUserAge extends Exception {
  constructor () {
    super('Invalid User AGE')
    this.spanishMessage = 'Edad del usuario invalida'
  }
}

export class AgeNotProvided extends Exception {
  constructor () {
    super('Age not provided')
    this.spanishMessage = 'Edad no suministrada'
  }
}
export class ContactNotProvided extends Exception {
  constructor () {
    super('Contact not provided')
    this.spanishMessage = 'Contacto no ingresado'
  }
}

export class PasswordNotProvided extends Exception {
  constructor () {
    super('Password not provided')
    this.spanishMessage = 'Contrasenia no ingresado'
  }
}
