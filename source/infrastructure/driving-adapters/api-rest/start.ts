import path from 'path'
import * as dotenv from 'dotenv'
import { DulceMomentoApp } from './DulceMomentoApp'

try {
  dotenv.config({
    path: path.resolve(__dirname, '../../../../.env')
  })

  new DulceMomentoApp().start()
} catch (error) {
  console.log(error)
}
