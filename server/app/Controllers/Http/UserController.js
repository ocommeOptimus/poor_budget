'use strict';

const User = use('App/Models/User');

class UserController {
  async register({request}) {
    const {email, password} = request.all();

    return await User.create({
      email,
      password,
      username: email,
    });
  }
}

module.exports = UserController;
