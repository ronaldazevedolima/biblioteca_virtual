module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'categorias',
      [
        { nome: 'Literatura fantástica' },
        { nome: 'Ficção histórica' },
        { nome: 'Ficção científica' },
      ],
      {
        timestamps: false,
      }
    );    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categorias', null, {});
  },
};
