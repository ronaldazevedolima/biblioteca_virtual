const Categorias = (sequelize, DataTypes) => {
  const createCategorias = sequelize.define(
    'categorias',
    {
      // idCategoria: {
      //   type: DataTypes.INTEGER,
      // },
      nome_categoria: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );

  createCategorias.associate = (models) => {
    createCategorias.hasMany(models.livros, { as: 'livros', foreignKey: 'idCategoria' });
  };
  return createCategorias;
};

module.exports = Categorias;
