/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('links').del();

  // Inserts seed entries
  await knex('links').insert([
    {
      id: 1,
      title: 'GitHub - Copilot',
      tag: 'a1b2c3d4e5f6g7h8',
      link: 'https://github.com/features/copilot'
    },
    {
      id: 2,
      title: 'MDN Web Docs',
      tag: 'i9j0k1l2m3n4o5p6',
      link: 'https://developer.mozilla.org'
    },
    {
      id: 3,
      title: 'Node.js Official Docs',
      tag: 'q7r8s9t0u1v2w3x4',
      link: 'https://nodejs.org/en/docs'
    },
    {
      id: 4,
      title: 'Express.js Framework',
      tag: 'y5z6a7b8c9d0e1f2',
      link: 'https://expressjs.com'
    },
    {
      id: 5,
      title: 'Knex.js Query Builder',
      tag: 'g3h4i5j6k7l8m9n0',
      link: 'https://knexjs.org'
    }
  ]);
};
