module.exports = {
  up: async (queryInterface, Sequelize) => {
    const createUsuarios = queryInterface.createTable('usuarios', {
      id_usuario: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome_usuario: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      senha: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      classificacao: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });

    return createUsuarios;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('usuarios');
  },
};
