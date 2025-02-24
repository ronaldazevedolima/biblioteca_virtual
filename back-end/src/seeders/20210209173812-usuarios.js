module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'usuarios',
      [
        {
          // senha 181216
          nome: 'Ronald Lima',
          email: 'ronald@ronald.com',
          senha: '$2b$10$vE1QYuWUUUw/oVbH8pEA3uYuYZ1THzJeUekVuUoJlZmTt5JcIIbS2',
          classificacao: 'admin',
        },
        {
          // senha 181216
          nome: 'Lorena',
          email: 'lorena@lorena.com',
          senha: '$2b$10$vE1QYuWUUUw/oVbH8pEA3uYuYZ1THzJeUekVuUoJlZmTt5JcIIbS2',
          classificacao: 'cliente',
        },
      ],
      {
        timestamps: false,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usuarios', null, {});
  },
};
