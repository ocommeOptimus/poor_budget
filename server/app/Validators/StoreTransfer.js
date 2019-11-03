'use strict'

class StoreTransfer {
  /**
   * Returns rules
   * @returns {{end_date: string, amount: string, name: string, recurrence_type: string, type: string, start_date: string}}
   */
  get rules() {
    return {
      name: 'required|max:80',
      type: 'required|in:debit,credit',
      amount: 'required|integer',
      start_date: 'required|date',
      end_date: 'date',
      recurrence_type: 'required|in:punctual,daily,weekly,monthly,quarterly'
    }
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

module.exports = StoreTransfer
