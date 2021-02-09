const Livros = (sequelize, DataTypes) => {
  const createLivros = sequelize.define(
    'livros',
    {
      idColecao: {
        type: DataTypes.INTEGER,
      },
      nomeLivro: {
        type: DataTypes.STRING,
      },
      idAutor: {
        type: DataTypes.INTEGER,
      },
      tenho: {
        type: DataTypes.BOOLEAN,
      },
      lido: {
        type: DataTypes.BOOLEAN,
      },
      nota: {
        type: DataTypes.INTEGER,
      },
      idCategoria: {
        type: DataTypes.INTEGER,
      },
      idEditora: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false }
  );

  createLivros.associate = (models) => {
    createLivros.belongsTo(models.colecoes, { as: 'colecoes', foreignKey: 'idColecao', targetKey: 'idColecao' });
    // createLivros.belongsTo(models.autores, { as: 'autores', foreignKey: 'idAutor', targetKey: 'idAutor' });
    // createLivros.belongsTo(models.categorias, { as: 'categorias', foreignKey: 'idCategoria', targetKey: 'idCategoria' });
    // createLivros.belongsTo(models.editoras, { as: 'editoras', foreignKey: 'idEditora', targetKey: 'idEditora' });
  };
  return createLivros;
};

module.exports = Livros;
