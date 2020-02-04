exports.seed = function(knex) {
  return knex('users').insert([
      {
          username: 'name',
          password: "password",
      },
  ]);
};