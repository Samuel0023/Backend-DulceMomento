const endpointResponse = ({ res, code = 200, status = true, message, body, options }: { res: any, code: Number, status: Boolean, message: string, body: any, options: string}): void => {
  res.status(200).json({
    status,
    code,
    message,
    body,
    options
  })
}

module.exports = {
  endpointResponse
}
