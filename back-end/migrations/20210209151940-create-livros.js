'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const createLivros = await queryInterface.createTable('Livros', {
      id_livro: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_colecao: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Colecoes', key: 'id_colecao' },
      },
      nome_livro: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      id_autor: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Autor', key: 'id_autor' },
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
      id_categoria: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Categorias', key: 'id_categoria' },
      },
      id_editora: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Editoras', key: 'id_editora' },
      },
    });
    return createLivros;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Livros');
  },
};
