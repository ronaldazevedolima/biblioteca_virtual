module.exports = {
  up: async (queryInterface, Sequelize) => {
    const criaColecoes = await queryInterface.createTable('colecoes', {
      id_colecao: {
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
    return criaColecoes;
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.dropTable('colecoes');
     
  }
};
