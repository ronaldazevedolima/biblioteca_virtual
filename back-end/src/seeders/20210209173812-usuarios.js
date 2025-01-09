module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'usuarios',
      [
        {
          nome: 'Ronald Lima',
          email: 'ronald@ronald.com',
          senha: '181216',
          classificacao: 'admin',
        },
        {
          nome: 'Lorena',
          email: 'lorena@lorena.com',
          senha: '181216',
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
