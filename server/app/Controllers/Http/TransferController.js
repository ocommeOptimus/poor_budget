'use strict';

const Transfer = use('App/Models/Transfer');
const AuthorizationService = use('App/Services/AuthorizationService');

/**
 * Transfer controller
 */
class TransferController {
  /**
   * Fetch all transfers own by user
   * @param auth
   * @returns {Promise<Response>}
   */
  async index({auth}) {
    // Retrieves the current user
    const user = await auth.getUser();

    // Returns all the transfer of this user
    return await user.transfers().fetch();
  }

  /**
   * Create a new transfer
   * @param auth
   * @param request
   */
  async create({auth, request}) {
    // Retrieves the current user
    const user = await auth.getUser();

    // Retrieves data from the request
    const {
      name,
      type,
      amount,
      start_date,
      end_date,
      recurring,
      recursion,
    } = request.all();

    // Create a new transfer from it
    const transfer = new Transfer();
    transfer.fill({
      name,
      type,
      amount,
      start_date,
      end_date,
      recurring,
      recursion,
    });

    // Saves the transfer and returns it
    await user.transfers().save(transfer);
    return transfer;
  }

  /**
   * Update an existing transfer
   * @param auth
   * @param request
   * @param params
   * @returns {Promise<void>}
   */
  async update({auth, request, params}) {
    // Retrieves the current user
    const user = await auth.getUser();

    // Retrieves the transfer and check authorization
    const {uuid} = params;
    const transfer = await Transfer.findByOrFail('uuid', uuid);
    AuthorizationService.verifyPermission(user, transfer);

    // Retrieves data from the request
    const {
      name,
      type,
      amount,
      start_date,
      end_date,
      recurring,
      recursion,
    } = request.all();

    // Merge it in the transfer
    transfer.merge({
      name,
      type,
      amount,
      start_date,
      end_date,
      recurring,
      recursion,
    });

    // Saves the transfer and returns it
    await transfer.save();
    return transfer;
  }

  /**
   *
   * @param auth
   * @param request
   * @param params
   * @returns {Promise<void>}
   */
  async delete({auth, request, params}) {
    // Retrieves the current user
    const user = await auth.getUser();

    // Retrieves the transfer and check authorization
    const {uuid} = params;
    const transfer = await Transfer.findByOrFail('uuid', uuid);
    AuthorizationService.verifyPermission(user, transfer);

    // Deletes the transfer and returns it
    await transfer.delete();
    return transfer;
  }
}

module.exports = TransferController;
