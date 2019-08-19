
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources_projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('resources_projects').insert([
        {resources_id: 2, projects_id: 1},
        {resources_id: 1, projects_id: 1},
        {resources_id: 7, projects_id: 1},
        {resources_id: 3, projects_id: 1},
        {resources_id: 6, projects_id: 1},
        {resources_id: 5, projects_id: 1},
        {resources_id: 12, projects_id: 3},
        {resources_id: 13, projects_id: 3},
        {resources_id: 11, projects_id: 3},
        {resources_id: 9, projects_id: 2},
        {resources_id: 10, projects_id: 2},
        {resources_id: 8, projects_id: 2}
      ]);
    });
};
