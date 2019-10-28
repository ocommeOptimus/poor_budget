'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TransferSchema extends Schema {
  up() {
    this.create('transfers', table => {
      table.increments();
      table.uuid('uuid').defaultTo(this.db.raw('uuid_generate_v4()'));
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users');
      table.string('name', 80).notNullable();
      table.enu('type', ['debit', 'credit']).notNullable();
      table
        .integer('amount')
        .notNullable()
        .unsigned();
      table.date('start_date').notNullable();
      table.date('end_date').nullable();
      table
        .enum('recurrent', [
          'punctual',
          'daily',
          'weekly',
          'monthly',
          'quarterly',
        ])
        .defaultTo('punctual');
      table.timestamps();
    });
  }

  down() {
    this.drop('transfers');
  }
}

module.exports = TransferSchema;
