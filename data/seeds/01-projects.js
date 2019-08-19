
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {id: 1, name: 'Build Week Application', description: 'A Lambda School unit project that will involve at least four students', completed: false},
        {id: 2, name: 'Code Challenges', description: 'A Lambda School unit project that will involve solving technical challenges', completed: false},
        {id: 3, name: 'Career Assessments', description: 'A Lambda School program that will involve multiple career challenges and assessments', completed: false}
      ]);
    });
};
