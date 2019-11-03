'use strict'

/** @typedef {import('@slynova/fence/dist/Guard')} Guard */
const Transfer = use('App/Models/Transfer')
const AccessDeniedException = use('App/Exceptions/AccessDeniedException')

/**
 * @property {Object} ctx
 * @property {Guard} ctx.gard
 */
class UpdateTransfer {
  /**
   * Returns rules
   * @returns {{end_date: string, amount: string, name: string, recurrence_type: string, type: string, start_date: string}}
   */
  get rules() {
    return {
      name: 'max:80',
      type: 'in:debit,credit',
      amount: 'integer',
      start_date: 'date',
      end_date: 'date',
      recurrence_type: 'in:punctual,daily,weekly,monthly,quarterly'
    }
  }

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

  /**
   * Return validation fails
   * @param errorMessages
   * @returns {Promise<*>}
   */
  async fails(errorMessages) {
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = UpdateTransfer
