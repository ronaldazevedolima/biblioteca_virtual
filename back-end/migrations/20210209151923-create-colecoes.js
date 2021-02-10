module.exports = {
  up: async (queryInterface, Sequelize) => {
    const createColecoes = await queryInterface.createTable('colecoes', {
      idColecao: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome_colecao: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      volumes: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
    return createColecoes;
  },

  down: async (queryInterface, Sequelize) => {
    
      await queryInterface.dropTable('colecoes');
     
  }
};
