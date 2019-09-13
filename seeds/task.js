
exports.seed = function(knex) {
  return knex('task').insert([
    {
      description: 'reflect moments when you feel your best',
      notes: 'you can ask others for reference',
      completed: false,
      project_id: 1
    }, // 1
    {
      description: 'write down your dream and aspiration',
      notes: 'focus on yourself only',
      completed: false,
      project_id: 1
    }, // 2
    {
      description: 'aware of moments when you are not motivated',
      notes: 'try to understand the why behind',
      completed: false,
      project_id: 1
    }, // 3
    {
      description: 'understand challenges of current Routing system',
      notes: 'do a good research',
      completed: true,
      project_id: 2
    }, // 4
    {
      description: 'think about a way to assign drivers most effectively',
      notes: 'be operational-oriented',
      completed: true,
      project_id: 2
    }, // 5
    {
      description: 'sketch the system',
      notes: 'use a whiteboard or blank paper',
      completed: false,
      project_id: 2
    }, // 6
  ])
};
