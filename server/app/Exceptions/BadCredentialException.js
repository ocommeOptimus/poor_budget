'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

const message = 'Bad credentials.'
const status = 401
const code = 'E_BAD_CREDENTIALS'

/**
 * BadCredentialException exception
 */
class BadCredentialException extends LogicalException {
  constructor() {
    super(message, status, code)
  }
}

module.exports = BadCredentialException
