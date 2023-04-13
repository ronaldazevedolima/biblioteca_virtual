module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'editoras',
      [
        { nome_editora: 'Martins Fontes' },
        { nome_editora: 'Leya' },
        { nome_editora: 'Record' },
        { nome_editora: 'Galera' },
        { nome_editora: 'Bertrand Brasil' },
        { nome_editora: 'Arqueiro' },
        { nome_editora: 'Saída de Emergência' },
        { nome_editora: 'Rocco' },
        { nome_editora: 'Publicações Europa-América' },
        { nome_editora: 'Conrad' },
        { nome_editora: 'Planeta' },
        { nome_editora: 'Verus' },
        { nome_editora: 'Wizards' },
        { nome_editora: 'Aleph' },
        { nome_editora: 'DarkSide' },
        { nome_editora: 'Imago' },
        { nome_editora: 'Francis' },
        { nome_editora: 'Sextante' },
        { nome_editora: 'Ediouro' },
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
