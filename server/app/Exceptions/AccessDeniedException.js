'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

const defaultMessage = 'You are not authorized to access this resource'
const status = 403
const code = 'E_ACCESS_DENIED'

class AccessDeniedException extends LogicalException {
  constructor(message) {
    if (!message) {
      message = defaultMessage
    }

    super(message, status, code)
  }
}

module.exports = AccessDeniedException
