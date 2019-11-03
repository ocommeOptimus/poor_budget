'use strict'

/** @typedef {import('@slynova/fence/dist/Guard')} Guard */
const Transfer = use('App/Models/Transfer')
const AccessDeniedException = use('App/Exceptions/AccessDeniedException')

class DeleteTransfer {
  /**
   * Handle authorization for transfer
   * @returns {Promise<boolean>}
   */
  async authorize() {
    // Retrieves transfer and get authorization
    const transfer = await Transfer.findOrFail(this.ctx.params.id)
    const authorized = this.ctx.guard.allows('update', transfer)

    // Handling unauthorized case
    if (!authorized) {
      throw new AccessDeniedException("You're not authorized to update this transfer.")
    }

    // Adds transfer to context and returns authorization
    this.ctx.transfer = transfer
    return authorized
  }
}

module.exports = DeleteTransfer
