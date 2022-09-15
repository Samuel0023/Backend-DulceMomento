import { Model, DataTypes, Optional } from 'sequelize'

import UserAtributes from '@domain/entities/user/UserDTO'
import sequelizeInstance from '../index'

interface UserCreationAttributes extends Optional<UserAtributes, 'id'> {}

class User extends Model<UserAtributes, UserCreationAttributes> implements UserAtributes {
  public id!: string
  public name!: string
  public usermail!: string
  public age: number
  public contact!: number
  public password!: string

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}

User.init(
  {
    id: {
      type: new DataTypes.STRING(128),
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    usermail: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    age: {
      type: new DataTypes.INTEGER(),
      allowNull: true
    },
    contact: {
      type: new DataTypes.INTEGER(),
      allowNull: false
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false
    }
  },
  {
    tableName: 'user',
    sequelize: sequelizeInstance
  }
)

export default User
