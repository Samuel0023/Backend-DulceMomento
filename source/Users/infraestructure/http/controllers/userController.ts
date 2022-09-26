import UserService from '../../../aplication/createUser'
import createHttpError from 'http-errors'


const { sendMailRegistration } = require('../services/sendMail')

const { catchAsync } = require('../helpers/catchAsync')
const { endpointResponse } = require('../helpers/success')

module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const resp = await getAllUsers()

      return endpointResponse({
        res,
        code: 200,
        message: 'Users retrieved successfully',
        body: resp,
      })
    } catch (err) {
      const httpError = createHttpError(
        err.statusCode,
        `[Error getting users] - [users - GET]: ${err.message}`,
      )

      return next(httpError)
    }
  }),

  register: catchAsync(async (req, res, next) => {
    const {
      body: {
        firstName,
        lastName,
        email,
        password,
      },
    } = req

    try {
      const responseBody = await createUser({
        firstName,
        lastName,
        email,
        password,
      })

      endpointResponse({
        res,
        code: 201,
        message: 'Account registered successfully',
        body: responseBody,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error registering account] - [auth/register - POST]: ${error.message}`,
      )

      next(httpError)
    }
  })
}