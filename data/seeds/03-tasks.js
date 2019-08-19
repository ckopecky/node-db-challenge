
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {id: 1, description: 'Meet for initial planning session', notes: ["plan design system", "figure out data needed"], completed: false, projects_id: 1},
        {id: 2, description: 'update resume', notes: ["add most recent lambda experience to resume"], completed: false, projects_id: 3},
        {id: 3, description: 'complete reverse string code challenge', notes: [], completed: false, projects_id: 2}
      ]);
    });
};
