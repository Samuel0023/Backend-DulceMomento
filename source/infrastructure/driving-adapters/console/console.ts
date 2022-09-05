import path from 'path'
import * as dotenv from 'dotenv'
import { UserCreatorUseCase } from '../../../application/usercases/UserCreator'
import { DynamoDBUserRepository } from '../../implementations/Aws/dynamo-db/DynamoDBUserRepository'
import { UserGetterUseCase } from '../../../application/usercases/UserGetter'
import { UserUpdaterUseCase } from '../../../application/usercases/UserUpdater'
import { UserDeleterUseCase } from '../../../application/usercases/UserDeleter'
import { UuidV4Generator } from '@infrastructure/UuidV4Generator'
import { Bcrypt } from '@infrastructure/Bcrypt'
(async () => {
  dotenv.config({
    path: path.resolve(__dirname, '../../../../.env')
  })
  const dynamoDBUserRepo = new DynamoDBUserRepository()
  const uuidV4Generator = new UuidV4Generator()
  const bycrypt = new Bcrypt()

  // Creando usuarios
  const userCreatorUseCase = new UserCreatorUseCase(dynamoDBUserRepo, uuidV4Generator, bycrypt)
  await userCreatorUseCase.run({
    name: 'Luciana',
    age: 12,
    mail: 'luciana24@mail.com',
    contact: 123123123,
    password: 'nashe123'
  })

  // Obteniendo usuarios
  const userGetterUseCase = new UserGetterUseCase(dynamoDBUserRepo)
  const usersReturned = await userGetterUseCase.run()
  console.log(usersReturned)

  // Actualizar usuarios
  const userUpdaterUseCase = new UserUpdaterUseCase(dynamoDBUserRepo)

  await userUpdaterUseCase.run({
    id: '1',
    mail: 'luci@gmail.com',
    name: '',
    age: 0
  })

  const usersReturned2 = await userGetterUseCase.run()
  console.log(usersReturned2)

  // Eliminar un usuario
  const userDeleterUseCase = new UserDeleterUseCase(dynamoDBUserRepo)
  await userDeleterUseCase.run('1')

  const usersReturned3 = await userGetterUseCase.run()
  console.log(usersReturned3)
})()
