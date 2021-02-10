module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'usuarios',
      [
        {
          nome_usuario: 'Ronald Lima',
          email: 'ronaldazevedolima@hotmail.com',
          senha: '@biblioteca',
          classificacao: 'administrador',
        },
        {
          nome_usuario: 'Usuario de teste',
          email: 'testuser@testuser.com',
          senha: '1234567',
          classificacao: 'cliente',
        },
      ],
      {}
    );
    {
      timestamps: false;
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usuarios', null, {});
  },
};
