import User from '../entities/user'

interface UserRepository {
  getById: (id: number) => Promise<User>
  getAll: () => Promise<User[]>
  save: (user: User) => Promise<User>
}
export default UserRepository
