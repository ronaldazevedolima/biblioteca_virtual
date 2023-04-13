module.exports = {
  up: async (queryInterface, Sequelize) => {
    const criaLivros = await queryInterface.createTable('livros', {
      id_livro: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_Colecao: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'colecoes', key: 'id_colecao' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nome_livro: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      id_autor: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'autores', key: 'id_autor' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
        references: { model: 'categorias', key: 'id_categoria' },
      },
      id_editora: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'editoras', key: 'id_editora' },
      },
    });
    return criaLivros;
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('livros');
  },
};
