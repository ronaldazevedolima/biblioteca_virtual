const Autores = (sequelize, DataTypes) => {
  const criaAutores = sequelize.define(
    'Autores',
    {
      idAutor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nomeAutor: {
        type: DataTypes.STRING,
      },
      nomeCompleto: {
        type: DataTypes.STRING,
      },
    },
    { 
      timestamps: false,
      underscored: true
   }
  );

  criaAutores.associate = ({ Livros }) => {
    criaAutores.hasMany(Livros, { as: 'livros', foreignKey: 'idAutor' });
  };
  return criaAutores;
};

module.exports = Autores;
