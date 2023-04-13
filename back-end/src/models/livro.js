const Livros = (sequelize, DataTypes) => {
  const criaLivros = sequelize.define(
    'livros',
    {
      idLivro: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
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
    { 
      timestamps: false,
      underscored: true,
    },
  );

  criaLivros.associate = ({ Colecoes, Autores, Categorias, Editoras}) => {
    criaLivros.belongsTo(Colecoes, { as: 'colecoes',  foreignKey: 'idColecao'});
    criaLivros.belongsTo(Autores, { as: 'autores', foreignKey: 'idAutor' });
    criaLivros.belongsTo(Categorias, { as: 'categorias', foreignKey: 'idCategoria', targetKey: 'idCategoria' });
    criaLivros.belongsTo(Editoras, { as: 'editoras', foreignKey: 'idEditora', targetKey: 'idEditora' });
  };
  return criaLivros;
};

module.exports = Livros;
