'use strict'

const Model = use('Model')
const moment = use('moment')

/**
 * Transfer model
 */
class Transfer extends Model {
  /**
   * Format date when retrieve it
   * @param {Date} start_date
   * @returns {String}
   */
  getStartDate(start_date) {
    return moment(start_date).format('YYYY-MM-DD')
  }

  /**
   * Format date when retrieve it
   * @param {Date} end_date
   * @returns {string}
   */
  getEndDate(end_date) {
    if (end_date !== null) {
      return moment(end_date).format('YYYY-MM-DD')
    }
    return ''
  }

  /**
   * Return the transfer owner
   * @returns {Object}
   */
  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Transfer
