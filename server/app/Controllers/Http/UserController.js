'use strict';

const User = use('App/Models/User');

/**
 *
 */
class UserController {
  /**
   * Login a user and return a JWT
   * @param request
   * @param auth
   * @returns {Promise<*>}
   */
  async login({request, auth}) {
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
