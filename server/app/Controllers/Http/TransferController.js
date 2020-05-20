'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */
const Transfer = use('App/Models/Transfer')

/**
 * Transfer controller
 */
class TransferController {
  /**
   * Fetch all transfers own by user
   * @param {Object} ctx
   * @param {AuthSession} ctx.auth
   * @returns {Promise<*>}
   */
  async index({ auth }) {
    // Retrieves the current user
    const user = await auth.getUser()

    // Returns all the transfer of this user
    return user.transfers().fetch()
  }

  /**
   * Create a new transfer and associate it with the auth user
   * @param {Object} ctx
   * @param {AuthSession} ctx.auth
   * @param {Request} ctx.request
   * @returns {Promise<Transfer>}
   */
  async create({ auth, request }) {
    // Retrieves the current user
    const user = await auth.getUser()

    // Retrieves data from the request
    const { name, type, amount, start_date, end_date, recurrence_type } = request.all()

    // Create a new transfer from it
    const transfer = new Transfer()
    transfer.fill({ name, type, amount, start_date, end_date, recurrence_type })

    // Saves the transfer and returns it
    await user.transfers().save(transfer)
    return transfer
  }

  /**
   * Update an existing transfer own by auth user
   * @param {Object} ctx
   * @param {Request} ctx.request
   * @param {Transfer} ctx.transfer
   * @returns {Promise<Transfer>}
   */
  async update({ request, transfer }) {
    // Retrieves data from the request
    const { name, type, amount, start_date, end_date, recurrence_type } = request.all()

    // Merge it in the transfer
    transfer.merge({ name, type, amount, start_date, end_date, recurrence_type })

    // Saves the transfer and returns it
    await transfer.save()
    return transfer
  }

  /**
   * Delete an transfer own by auth user
   * @param {Object} ctx
   * @param {Transfer} ctx.transfer
   * @returns {Promise<Transfer>}
   */
  async delete({ transfer }) {
    // Deletes the transfer and returns it
    await transfer.delete()
    return transfer
  }
}

module.exports = TransferController
