'use strict';

const User = use('App/Models/User');

/**
 * User controller
 */
class UserController {
  /**
   * Login a user and return a JWT
   * @param auth
   * @param request
   * @returns {Promise<*>}
   */
  async login({auth, request}) {
    const {email, password} = request.all();

    return await auth.attempt(email, password);
  }

  /**
   * Register a user and try to login him
   * @param request
   * @returns {Promise<*>}
   */
  async register({request}) {
    const {email, password} = request.all();

    await User.create({
      email,
      password,
      username: email,
    });

    return this.login(...arguments);
  }
}

module.exports = UserController;
