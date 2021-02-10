module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'colecoes',
      [
        { nome_colecao: 'O Senhor dos Anéis', volumes: 3 },
        { nome_colecao: 'O Conquistador', volumes: 5 },
        { nome_colecao: 'O Imperador', volumes: 5 },
        { nome_colecao: 'As Crônicas de Artur', volumes: 3 },
        { nome_colecao: 'A Busca do Graal', volumes: 4 },
        { nome_colecao: 'As Aventuras de Sharpe', volumes: 21 },
        { nome_colecao: 'As Crônicas Saxônicas', volumes: 11 },
        { nome_colecao: 'Jogos Vorazes', volumes: 3 },
        { nome_colecao: 'Harry Potter', volumes: 8 },
        { nome_colecao: 'Assassin`s Creed', volumes: 11 },
        { nome_colecao: 'O Trono do Sol - O Ciclo Nessântico', volumes: 3 },
        { nome_colecao: 'Ramsés', volumes: 5 },
        { nome_colecao: 'Pedra da Luz', volumes: 4 },
        { nome_colecao: 'Ciclo da Herança', volumes: 5 },
        { nome_colecao: 'The Witcher', volumes: 7 },
        { nome_colecao: 'Duna', volumes: 6 },
        { nome_colecao: 'As Brumas de Avalon', volumes: 4 },
        { nome_colecao: 'A Saga do Império', volumes: 3 },
        { nome_colecao: 'A Saga do Mago', volumes: 4 },
        { nome_colecao: 'Saga do Assassino', volumes: 3 },
        { nome_colecao: 'Crônicas de Dragonlance', volumes: 3 },
        { nome_colecao: 'Dragões de Éter', volumes: 3 },
        { nome_colecao: 'Crônicas de Gelo e Fogo', volumes: 5 },
        { nome_colecao: 'A Crônica do Matador do Rei', volumes: 3 },
        { nome_colecao: 'A Saga do Tigre', volumes: 6 },
        { nome_colecao: 'Alexandros', volumes: 3 },
      ],
      {}
    );
    {
      timestamps: false;
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('colecoes', null, {});
  },
};
