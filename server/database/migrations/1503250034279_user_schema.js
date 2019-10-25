'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  async up() {
    this.create('users', table => {
      table.increments();
      table
        .uuid('uuid')
        .notNullable()
        .defaultTo(this.db.raw('uuid_generate_v4()'));
      table
        .string('username', 80)
        .notNullable()
        .unique();
      table
        .string('email', 254)
        .notNullable()
        .unique();
      table.string('password', 255).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
