module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'autores',
      [
        { nome: 'J. R. R. Tolkien', nome_completo: 'John Ronald Reuel Tolkien' },
        { nome: 'Bernard Cornwell', nome_completo: 'Bernard Cornwell' },
        { nome: 'Christian Jacq', nome_completo: 'Christian Jacq' },
        { nome: 'Conn Iggulden', nome_completo: 'Conn Iggulden' },
        { nome: 'George R. R. Martin', nome_completo: 'George Raymond Richard Martin' },
        { nome: 'J. K. Rowling', nome_completo: 'Joanne Rowling' },
        { nome: 'Patrick Rothfuss', nome_completo: 'Patrick James Rothfuss' },
        { nome: 'Christopher Paolini', nome_completo: 'Christopher Paolini' },
        { nome: 'Oliver Bowden', nome_completo: 'Anton Gill' },
        { nome: 'Andrzej Sapkowski', nome_completo: 'Andrzej Sapkowski' },
        { nome: 'S. L. Farrell', nome_completo: 'Stephen Leigh' },
        { nome: 'Raymond E. Feist', nome_completo: 'Raymond Elias Feist' },
        { nome: 'Suzanne Collins', nome_completo: 'Suzanne Marie Collins' },
        { nome: 'Marion Zimmer Bradley', nome_completo: 'Marion Eleanor Zimmer Bradley' },
        { nome: 'Valerio Massimo Manfredi', nome_completo: 'Valerio Massimo Manfredi' },
        { nome: 'Margaret Weis', nome_completo: 'Margaret Edith Weis' },
        { nome: 'Terry Brooks', nome_completo: 'Terence Dean Brooks' },
        { nome: 'Frank Herbert', nome_completo: 'Frank Patrick Herbert' },
        { nome: 'Raphael Draccon', nome_completo: 'Rafael Albuquerque Pereira' },
        { nome: 'Colleen Houck', nome_completo: 'Colleen Houck' },
        { nome: 'T. H. White', nome_completo: 'Terence Hanbury White' },
        { nome: 'Orlando Paes Filho', nome_completo: 'Orlando Paes Filho' },
        { nome: 'Anthony Ryan', nome_completo: 'Anthony Ryan' },
        { nome: 'Scott Lynch', nome_completo: 'Scott Lynch' },
        { nome: 'David Malouf', nome_completo: 'David George Joseph Malouf ' },
        { nome: 'David Gibbins', nome_completo: 'David Gibbins' },
        { nome: 'Eduardo Spohr', nome_completo: 'Eduardo Spohr' },
        { nome: 'George Lucas', nome_completo: 'George Walton Lucas Jr.' },
        { nome: 'Robert E. Vardeman', nome_completo: 'Robert Edward Vardeman' },
        { nome: 'Terry Pratchett', nome_completo: 'Terence David John Pratchett' },
        { nome: 'Nate Kenyon', nome_completo: 'Nate Kenyon' },
        { nome: 'Ernest Cline', nome_completo: 'Ernest Christy Cline' },
        { nome: 'Ken Follett', nome_completo: 'Kenneth Martin Follett' },
        { nome: 'David Colbert', nome_completo: 'David Colbert' },
        { nome: 'Clive Staples Lewis', nome_completo: 'C. S. Lewis' },
        { nome: 'Erik Durschmied', nome_completo: 'Erik Durschmied' },
        { nome: 'Terence David John Pratchett', nome_completo: 'Terry Pratchett' },
      ],
      {
        timestamps: false,
      }     
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('autores', null, {});
  },
};
