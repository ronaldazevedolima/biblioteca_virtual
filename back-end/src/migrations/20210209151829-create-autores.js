module.exports = {
  up: async (queryInterface, Sequelize) => {
    const criaAutor = await queryInterface.createTable('autores', {
      id_autor: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome_autor: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nome_completo: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
    return criaAutor;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('autores');
  },
};
