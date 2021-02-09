const Autores = (sequelize, DataTypes) => {
  const createAutores = sequelize.define(
    'autores',
    {
      idAutor: {
        type: DataTypes.INTEGER,
      },
      nome_autor: {
        type: DataTypes.INTEGER,
      },
      nome_completo: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false }
  );

  createAutores.associate = (models) => {
    createAutores.hasMany(models.livros, { as: 'livros', foreignKey: 'idAutor' });
  };
  return createAutores;
};

module.exports = Autores;
