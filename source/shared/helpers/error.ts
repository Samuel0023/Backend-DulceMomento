class ErrorObject extends Error {
  statusCode: Number
  status: string
  isOperational: boolean
  errors: []
  constructor (message: any, statusCode: any, errors: [] = []) {
    super()

    this.message = message
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.isOperational = true
    this.errors = errors

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = {
  ErrorObject
}
