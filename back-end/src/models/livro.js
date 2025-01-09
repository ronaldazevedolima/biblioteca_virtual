const Livros = (sequelize, DataTypes) => {
  const criaLivros = sequelize.define(
    'Livros',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idColecao: {
        type: DataTypes.INTEGER,
      },
      nome: {
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
    criaLivros.belongsTo(Colecoes, { as: 'colecao',  foreignKey: 'idColecao', targetKey: 'id'});
    criaLivros.belongsTo(Autores, { as: 'autor', foreignKey: 'idAutor', targetKey: 'id' });
    criaLivros.belongsTo(Categorias, { as: 'categoria', foreignKey: 'idCategoria', targetKey: 'id' });
    criaLivros.belongsTo(Editoras, { as: 'editora', foreignKey: 'idEditora', targetKey: 'id' });
  };
  return criaLivros;
};

module.exports = Livros;
