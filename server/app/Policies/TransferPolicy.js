'use strict'

/** @typedef {import('App/Models/Transfer')} Transfer */
/** @typedef {import('App/Models/User')} User */

class TransferPolicy {
  /**
   * Policy for a transfer update
   * @param {User} user
   * @param {Transfer} transfer
   * @returns {boolean}
   */
  update(user, transfer) {
    return user.id === transfer.user_id
  }

  /**
   * Policy for a transfer destroy
   * @param {User} user
   * @param {Transfer} transfer
   * @returns {boolean}
   */
  destroy(user, transfer) {
    return user.id === transfer.user_id
  }
}

module.exports = TransferPolicy
