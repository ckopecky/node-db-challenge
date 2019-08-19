
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {id: 1, name: 'UI Developer' , description: "Lambda Student who has completed first unit of Web Development Course", projects_id: 1},
        {id: 2, name: 'Front End Architect' , description: "Lambda Student who has completed the React Unit of Web Development Course", projects_id: 1},
        {id: 3, name: 'Back End Architect' , description: "Lambda Student who has completed the Back End Web Development Course", projects_id: 1},
        {id: 4, name: 'UX Designer' , description: "Lambda Student who has completed a unit of the UX Design Course", projects_id: 1},
        {id: 5, name: 'Data Scientist' , description: "Lambda Student who has completed a unit of the Data Science course", projects_id: 1},
        {id: 6, name: 'iOS Developer' , description: "Lambda Student who has completed a unit of the iOS course", projects_id: 1},
        {id: 7, name: 'Android Developer' , description: "Lambda Student who has completed the a unit of the Android Development Course", projects_id: 1},
        {id: 8, name: 'Hackerrank Challenges' , description: "Platform Designed To Challenge Lambda Students on Code Challenges", projects_id: 2},
        {id: 9, name: 'Cracking the Coding Interview' , description: "Book written by Gayle Laakmann McDowell that lays out interview process for FAANG companies", projects_id: 2},
        {id: 10, name: 'Pair Programming' , description: "A style of writing code where there is a navigator and a driver and the partners can feed ideas off of each other to help solve the problem", projects_id: 2},
        {id: 11, name: 'Resume' , description: "Curriculum Vitae or Summary of Past Work Experiences", projects_id: 3},
        {id: 12, name: 'LinkedIn Profile' , description: "Endorsed LinkedIn Profile Page with connections", projects_id: 3},
        {id: 13, name: 'Portfolio' , description: "Online representation of work that has been done", projects_id: 3}


      ]);
    });
};
