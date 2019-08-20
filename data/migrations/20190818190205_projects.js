
exports.up = function(knex) {
    return knex.schema
        .createTable('projects', tbl => {
            tbl.increments('id')
            tbl.string('name', 255).notNullable()
            tbl.string('description', 255)
            tbl.boolean('completed').nullable()
        })
        .createTable('resources', tbl => {
            tbl.increments('id')
            tbl.string('name', 255).notNullable()
            tbl.string('description', 255)
            tbl.integer('projects_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })
        .createTable('tasks', tbl => {
            //id
            tbl.increments('id')
            tbl.string('description', 255).notNullable()
            tbl.string('notes', 255) 
            tbl.boolean('completed').notNullable().defaultTo(false)
            tbl.integer('projects_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');

        })
        .createTable('resources_projects', tbl => {
            tbl.integer('resources_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('resources')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            tbl.integer('projects_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects')
                .onDelete('CASCADE')
                .onUpdate('CASCADE')
            tbl.primary(['resources_id', 'projects_id']);
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('resources_projects')
        .dropTableIfExists('tasks')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects');

};
