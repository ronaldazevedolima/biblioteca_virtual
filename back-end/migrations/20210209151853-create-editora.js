'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const createEditoras = await queryInterface.createTable('Editoras', {
      id_categoria: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome_categoria: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
    return createEditoras;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Editoras');
  },
};
