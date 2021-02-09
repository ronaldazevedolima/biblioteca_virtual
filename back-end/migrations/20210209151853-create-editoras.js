'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const createEditoras = await queryInterface.createTable('editoras', {
      idEditora: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome_editora: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
    return createEditoras;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('editoras');
  },
};
