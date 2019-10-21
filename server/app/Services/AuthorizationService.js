'use strict';

const InvalidAccessException = use('App/Exceptions/InvalidAccessException');

/**
 * Manage permissions in the application
 */
class AuthorizationService {
  /**
   * Verify if user has access to the resource
   * @param {Object} user
   * @param {Object} resource
   */
  verifyPermission(user, resource) {
    if (user.id !== resource.user_id) {
      throw new InvalidAccessException();
    }
  }
}

module.exports = new AuthorizationService();
