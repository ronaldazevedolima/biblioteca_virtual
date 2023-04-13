module.exports = {
  up: async (queryInterface, Sequelize) => {
    const criaEditoras = await queryInterface.createTable('editoras', {
      id_editora: {
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
    return criaEditoras;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('editoras');
  },
};
