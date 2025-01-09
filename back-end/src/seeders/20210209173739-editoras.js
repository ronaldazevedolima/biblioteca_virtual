module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'editoras',
      [
        { nome: 'Martins Fontes' },
        { nome: 'Leya' },
        { nome: 'Record' },
        { nome: 'Galera' },
        { nome: 'Bertrand Brasil' },
        { nome: 'Arqueiro' },
        { nome: 'Saída de Emergência' },
        { nome: 'Rocco' },
        { nome: 'Publicações Europa-América' },
        { nome: 'Conrad' },
        { nome: 'Planeta' },
        { nome: 'Verus' },
        { nome: 'Wizards' },
        { nome: 'Aleph' },
        { nome: 'DarkSide' },
        { nome: 'Imago' },
        { nome: 'Francis' },
        { nome: 'Sextante' },
        { nome: 'Ediouro' },
      ],
      {
        timestamps: false,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('editoras', null, {});
  },
};
