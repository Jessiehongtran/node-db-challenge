
exports.seed = function(knex) {
  return knex('resource').truncate()
  .then(function () {
    // Inserts seed entries
    return knex('resource').insert([
    {
      resource_name: 'laptop',
      description: 'Macbook, can store data'
    }, // 1
    {
      resource_name: 'network',
      description: 'friends, coworker, family'
    }, // 2
    {
      resource_name: 'you',
      description: 'be present and stay focused'
    }, // 3
    {
      resource_name: 'internet',
      description: 'strong wifi or cable'
    }, // 4
    {
      resource_name: 'time',
      description: 'at least some hours a day'
    }, // 5
    {
      resource_name: 'paper or whiteboard',
      description: 'to sketch'
    }, // 6
  ])
})
};
