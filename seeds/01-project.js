
exports.seed = function(knex) {
  return knex('project').truncate()
  .then(function () {
    // Inserts seed entries
    return knex('project').insert([
    {
      project_name: 'Finding your purpose',
      description: 'It is hard to navigate your life without a purpose so finding it',
      completed: false
    }, // 1
    {
      project_name: 'Creating Routing management system',
      description: 'Routing has not been managed effectively by the company so they need a way to control drivers and assign them optimally',
      completed: false
    }, // 2

  ])
}) 
};
