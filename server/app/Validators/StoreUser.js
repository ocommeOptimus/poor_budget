'use strict'

class StoreUser {
  /**
   * Get rules
   * @returns {{password: string, email: string}}
   */
  get rules() {
    return {
      email: 'required|email|unique:users',
      password: 'required'
    }
  }

  /**
   * Return validation fails
   * @param errorMessages
   * @returns {Promise<*>}
   */
  async fails(errorMessages) {
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = StoreUser
