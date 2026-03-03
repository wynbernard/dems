/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("admin_table", function (table) {
    table.increments("admin_id").primary();
    table.string("f_name").notNullable();
    table.string("l_name").notNullable();
    table.string("username").notNullable().unique();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.string("role").notNullable();
    table.integer("evac_loc_id").unsigned().nullable();
    table.boolean("is_active").notNullable().defaultTo(true); // ← added
    table.timestamp("deleted_at").nullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("admin_table");
};