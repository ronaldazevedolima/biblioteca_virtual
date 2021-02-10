module.exports = {
  up: async (queryInterface, Sequelize) => {
    const createCategorias = await queryInterface.createTable('categorias', {
      idCategoria: {
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
    return createCategorias;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('categorias');
  },
};
