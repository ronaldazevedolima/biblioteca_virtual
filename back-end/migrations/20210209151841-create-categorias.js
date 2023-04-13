module.exports = {
  up: async (queryInterface, Sequelize) => {
    const criaCategorias = await queryInterface.createTable('categorias', {
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
    return criaCategorias;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('categorias');
  },
};
