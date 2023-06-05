module.exports = {
  up: async (queryInterface, Sequelize) => {
    const criaColecoes = await queryInterface.createTable('colecoes', {
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
