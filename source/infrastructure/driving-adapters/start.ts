import 'module-alias/register'
import path from 'path'
import * as dotenv from 'dotenv'
import { DulceMomentoApp } from './api-rest/DulceMomentoApp'
// import { TuttoDataFakerGraphQL } from './graphql/TuttoDataFakerGraphQL'

try {
  dotenv.config({
    path: path.resolve(__dirname, '../../../.env')
  })

  new DulceMomentoApp().start()
  // new TuttoDataFakerGraphQL().start()
} catch (error) {
  console.log(error)
}
