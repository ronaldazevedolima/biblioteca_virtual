'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const createAutor = await queryInterface.createTable('autores', {
      idAutor: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome_autor: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nome_completo: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
    return createAutor;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('autores');
  },
};
