import http from 'http'
import util from 'util'

const HttpError = function (status, message, errors = []) {
  Error.apply(this, arguments)
  Error.captureStackTrace(this, HttpError)

  this.status = status
  this.message = message || http.STATUS_CODES[status] || 'Error'
  this.errors = errors
}

util.inherits(HttpError, Error)
HttpError.prototype.name = 'HttpError'

const ServiceError = function (message, data = {}) {
  Error.apply(this, arguments)
  Error.captureStackTrace(this, ServiceError)

  if (data instanceof ServiceError) {
    this.message = data.message
    this.errorData = data.errorData
  } else {
    this.message = message || 'Error'
    this.errorData = data
  }
}

util.inherits(ServiceError, Error)
HttpError.prototype.name = 'ServiceError'

export {
  HttpError,
  ServiceError
}