
exports.up = function(knex) {
  return knex.schema
    .createTable('project', tbl => {
        tbl.increments('id');
        tbl.string('project_name',128).notNullable();
        tbl.string('description');
        tbl.boolean('completed').notNullable().defaultTo(false);

    })
    .createTable('resource', tbl => {
        tbl.increments('id');
        tbl.string('resource_name').notNullable().unique();
        tbl.string('description');
    })
    .createTable('task', tbl => {
        tbl.increments('id');
        tbl.string('description').notNullable();
        tbl.string('notes')
        tbl.boolean('completed').notNullable().defaultTo(false);

        // Foreign key
        tbl
            .integer('project_id')
            .unsigned()
            .references('id')
            .inTable('project')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    })
    // Foreign key
    .createTable('project_resource', tbl => {
        tbl
            .integer('project_id')
            .unsigned()
            .references('project.id')
            // .inTable('project')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        tbl
            .integer('resource_id')
            .unsigned()
            .references('resource.id')
            // .inTable('resource')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        tbl.primary(['project_id', 'resource_id'])
    })

};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('project_resource')
    .dropTableIfExists('task')
    .dropTableIfExists('resource')
    .dropTableIfExists('project')

};
