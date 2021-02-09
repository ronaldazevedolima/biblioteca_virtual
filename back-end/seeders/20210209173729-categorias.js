'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'categorias',
      [
        { nome_categoria: 'Literatura fantástica' },
        { nome_categoria: 'Ficção histórica' },
        { nome_categoria: 'Ficção científica' },
      ],
      {}
    );
    {
      timestamps: false;
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categorias', null, {});
  },
};
