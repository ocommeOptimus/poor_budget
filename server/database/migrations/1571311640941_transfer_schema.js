'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

/**
 * Transfer schema
 */
class TransferSchema extends Schema {
  up() {
    this.create('transfers', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
      table.string('name', 80).notNullable()
      table.enum('type', ['debit', 'credit']).notNullable()
      table
        .integer('amount')
        .notNullable()
        .unsigned()
      table.date('start_date').notNullable()
      table.date('end_date').nullable()
      table.enum('recurrence_type', ['punctual', 'daily', 'weekly', 'monthly', 'quarterly']).defaultTo('punctual')
      table.timestamps()
    })
  }

  down() {
    this.drop('transfers')
  }
}

module.exports = TransferSchema
