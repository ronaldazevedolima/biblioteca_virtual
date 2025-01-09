module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'colecoes',
      [
        { nome: 'Sem Coleção', volumes: 1 },
        { nome: 'O Senhor dos Anéis', volumes: 3 },
        { nome: 'O Conquistador', volumes: 5 },
        { nome: 'O Imperador', volumes: 5 },
        { nome: 'As Crônicas de Artur', volumes: 3 },
        { nome: 'A Busca do Graal', volumes: 4 },
        { nome: 'As Aventuras de Sharpe', volumes: 21 },
        { nome: 'As Crônicas Saxônicas', volumes: 11 },
        { nome: 'Jogos Vorazes', volumes: 3 },
        { nome: 'Harry Potter', volumes: 8 },
        { nome: 'Assassin`s Creed', volumes: 11 },
        { nome: 'O Trono do Sol - O Ciclo Nessântico', volumes: 3 },
        { nome: 'Ramsés', volumes: 5 },
        { nome: 'Pedra da Luz', volumes: 4 },
        { nome: 'Ciclo da Herança', volumes: 5 },
        { nome: 'The Witcher', volumes: 7 },
        { nome: 'Duna', volumes: 6 },
        { nome: 'As Brumas de Avalon', volumes: 4 },
        { nome: 'A Saga do Império', volumes: 3 },
        { nome: 'A Saga do Mago', volumes: 4 },
        { nome: 'Saga do Assassino', volumes: 3 },
        { nome: 'Crônicas de Dragonlance', volumes: 3 },
        { nome: 'Dragões de Éter', volumes: 3 },
        { nome: 'Crônicas de Gelo e Fogo', volumes: 5 },
        { nome: 'A Crônica do Matador do Rei', volumes: 3 },
        { nome: 'A Saga do Tigre', volumes: 6 },
        { nome: 'Alexandros', volumes: 3 },
        { nome: 'A Espada de Shannara', volumes: 3 },
        { nome: 'God of War', volumes: 2 },
        { nome: 'O Único e Eterno Rei', volumes: 5 },
        { nome: 'Angus', volumes: 3 },
        { nome: 'Filhos do Éden', volumes: 3 },
        { nome: 'Os Nobres Vigaristas', volumes: 7 },
        { nome: 'A Sombra do Corvo', volumes: 3 },
        { nome: 'Diablo III', volumes: 4 },
        { nome: 'Star Wars', volumes: 3 },
        { nome: 'As Crônicas de Nárnia', volumes: 7 },
        { nome: 'Discoworld', volumes: 41 },
      ],
      {
        timestamps: false,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('colecoes', null, {});
  },
};
