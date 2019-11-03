'use strict'

const Model = use('Model')
const moment = use('moment')

class Transfer extends Model {
  /**
   * Return only active transfer
   * @param query
   */
  static scopeIsActive(query) {
    return query.where(function() {
      this.where('end_date', null).orWhere('end_date', '>', moment().format('YYYY-MM-DD'))
    })
  }

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
   * @param {Date|Null} end_date
   * @returns {String|Null}
   */
  getEndDate(end_date) {
    if (end_date !== null) {
      return moment(end_date).format('YYYY-MM-DD')
    }
    return end_date
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
