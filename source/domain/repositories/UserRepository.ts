import { Nullable } from '@domain/Nullable'
import { User } from '../entities/user/User'

export interface UserRepository {
  getAll: () => Promise<User[]>
  save: (user: User) => Promise<User>
  getByUserMail: (usermail: string) => Promise<Nullable<User>>
  update: (user: User) => Promise<Nullable<User>>
  delete: (user: User) => Promise<void>
  getById: (id: string) => Promise<Nullable<User>>
}
