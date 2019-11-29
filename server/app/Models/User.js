'use strict'

const Model = use('Model')

/**
 * User model
 */
class User extends Model {
  static boot() {
    super.boot()
    /**
     * A hook to hash the user password before saving it to the database.
     */
    this.addHook('beforeSave', 'UserHook.hashPassword')
  }

  /**
   * Hidden fields
   * @returns {Array}
   */
  static get hidden() {
    return ['password']
  }

  /**
   * A relationship on tokens is required for auth to work.
   * Since features like `refreshTokens` or `rememberToken`
   * will be saved inside the tokens table.
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }

  /**
   * Gets all transfers associated with an user
   * @returns {Object}
   */
  transfers() {
    return this.hasMany('App/Models/Transfer')
  }
}

module.exports = User
