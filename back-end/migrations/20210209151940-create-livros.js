'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const createLivros = await queryInterface.createTable('livros', {
      id_livro: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idColecao: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        references: { model: 'colecoes', key: 'idColecao' },
      },
      nomeLivro: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      idAutor: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'autores', key: 'idAutor' },
      },
      tenho: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      lido: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      nota: {
        type: Sequelize.INTEGER,
      },
      idCategoria: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'categorias', key: 'idCategoria' },
      },
      idEditora: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'editoras', key: 'idEditora' },
      },
    });
    return createLivros;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('livros');
  },
};
