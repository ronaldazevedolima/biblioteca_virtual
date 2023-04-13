module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'autores',
      [
        { nome_autor: 'J. R. R. Tolkien', nome_completo: 'John Ronald Reuel Tolkien' },
        { nome_autor: 'Bernard Cornwell', nome_completo: 'Bernard Cornwell' },
        { nome_autor: 'Christian Jacq', nome_completo: 'Christian Jacq' },
        { nome_autor: 'Conn Iggulden', nome_completo: 'Conn Iggulden' },
        { nome_autor: 'George R. R. Martin', nome_completo: 'George Raymond Richard Martin' },
        { nome_autor: 'J. K. Rowling', nome_completo: 'Joanne Rowling' },
        { nome_autor: 'Patrick Rothfuss', nome_completo: 'Patrick James Rothfuss' },
        { nome_autor: 'Christopher Paolini', nome_completo: 'Christopher Paolini' },
        { nome_autor: 'Oliver Bowden', nome_completo: 'Anton Gill' },
        { nome_autor: 'Andrzej Sapkowski', nome_completo: 'Andrzej Sapkowski' },
        { nome_autor: 'S. L. Farrell', nome_completo: 'Stephen Leigh' },
        { nome_autor: 'Raymond E. Feist', nome_completo: 'Raymond Elias Feist' },
        { nome_autor: 'Suzanne Collins', nome_completo: 'Suzanne Marie Collins' },
        { nome_autor: 'Marion Zimmer Bradley', nome_completo: 'Marion Eleanor Zimmer Bradley' },
        { nome_autor: 'Valerio Massimo Manfredi', nome_completo: 'Valerio Massimo Manfredi' },
        { nome_autor: 'Margaret Weis', nome_completo: 'Margaret Edith Weis' },
        { nome_autor: 'Terry Brooks', nome_completo: 'Terence Dean Brooks' },
        { nome_autor: 'Frank Herbert', nome_completo: 'Frank Patrick Herbert' },
        { nome_autor: 'Raphael Draccon', nome_completo: 'Rafael Albuquerque Pereira' },
        { nome_autor: 'Colleen Houck', nome_completo: 'Colleen Houck' },
        { nome_autor: 'T. H. White', nome_completo: 'Terence Hanbury White' },
        { nome_autor: 'Orlando Paes Filho', nome_completo: 'Orlando Paes Filho' },
        { nome_autor: 'Anthony Ryan', nome_completo: 'Anthony Ryan' },
        { nome_autor: 'Scott Lynch', nome_completo: 'Scott Lynch' },
        { nome_autor: 'David Malouf', nome_completo: 'David George Joseph Malouf ' },
        { nome_autor: 'David Gibbins', nome_completo: 'David Gibbins' },
        { nome_autor: 'Eduardo Spohr', nome_completo: 'Eduardo Spohr' },
        { nome_autor: 'George Lucas', nome_completo: 'George Walton Lucas Jr.' },
        { nome_autor: 'Robert E. Vardeman', nome_completo: 'Robert Edward Vardeman' },
        { nome_autor: 'Terry Pratchett', nome_completo: 'Terence David John Pratchett' },
        { nome_autor: 'Nate Kenyon', nome_completo: 'Nate Kenyon' },
        { nome_autor: 'Ernest Cline', nome_completo: 'Ernest Christy Cline' },
        { nome_autor: 'Ken Follett', nome_completo: 'Kenneth Martin Follett' },
        { nome_autor: 'David Colbert', nome_completo: 'David Colbert' },
        { nome_autor: 'Clive Staples Lewis', nome_completo: 'C. S. Lewis' },
        { nome_autor: 'Erik Durschmied', nome_completo: 'Erik Durschmied' },
        { nome_autor: 'Terence David John Pratchett', nome_completo: 'Terry Pratchett' },
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
