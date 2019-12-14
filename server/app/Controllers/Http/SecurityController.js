'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */
const User = use('App/Models/User')
const BadCredentialException = use('App/Exceptions/BadCredentialException')

/**
 * User controller
 */
class SecurityController {
  /**
   * Login a user and return a JWT
   * @param {Object} ctx
   * @param {AuthSession} ctx.auth
   * @param {Request} ctx.request
   * @returns {Promise<*>}
   */
  async login({ auth, request }) {
    const { email, password } = request.all()

    try {
      return await auth.attempt(email, password)
    } catch (error) {
      throw new BadCredentialException()
    }
  }

  /**
   * Register a user and try to login him
   * @param {Object} ctx
   * @param {Request} ctx.request
   * @returns {Promise<*>}
   */
  async register({ request }) {
    const { email, password } = request.all()

    await User.create({ email, password, username: email })

    return this.login(...arguments)
  }

  /**
   * Return the user logged in
   * @param {Object} ctx
   * @param {AuthSession} ctx.auth
   * @returns {Promise<User>}
   */
  async user({ auth }) {
    return auth.getUser()
  }
}

module.exports = SecurityController
