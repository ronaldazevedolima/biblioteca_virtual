module.exports = {
  up: async (queryInterface, Sequelize) => {
    const criaCategorias = await queryInterface.createTable('categorias', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
    return criaCategorias;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('categorias');
  },
};
