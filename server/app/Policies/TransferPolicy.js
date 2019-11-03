'use strict'

class TransferPolicy {
  update(user, transfer) {
    return user.id === transfer.user_id
  }

  destroy(user, transfer) {
    return user.id === transfer.user_id
  }
}

module.exports = TransferPolicy
