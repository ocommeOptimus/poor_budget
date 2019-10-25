'use strict';

const Model = use('Model');
const Hash = use('Hash');

class User extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving it to the database.
     */
    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  /**
   * Hides named fields
   * @returns {Array}
   */
  static get hidden() {
    return ['id'];
  }

  /**
   * A relationship on tokens is required for auth to work.
   * Since features like `refreshTokens` or `rememberToken`
   * will be saved inside the tokens table.
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token');
  }

  /**
   * Gets all transfers associated with an user
   * @returns {Object}
   */
  transfers() {
    return this.hasMany('App/Models/Transfer');
  }
}

module.exports = User;
