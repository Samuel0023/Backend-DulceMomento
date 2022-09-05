import { hashSync, genSaltSync } from 'bcrypt'
import { BcryptEncryter } from '@domain/utils/bcryptEncrypter'

export class Bcrypt implements BcryptEncryter {
  encryt (word: string): string {
    const salt = genSaltSync()
    return hashSync(word, salt)
  }
}
