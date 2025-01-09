module.exports = {
  up: async (queryInterface, Sequelize) => {
    const criaEditoras = await queryInterface.createTable('editoras', {
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
    return criaEditoras;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('editoras');
  },
};
