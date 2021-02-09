const Editoras = (sequelize, DataTypes) => {
  const createEditoras = sequelize.define(
    'editoras',
    {
      idEditora: {
        type: DataTypes.INTEGER,
      },
      nome_editora: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );

  createEditoras.associate = (models) => {
    createEditoras.hasMany(models.livros, { as: 'livros', foreignKey: 'idEditora' });
  };
  return createEditoras;
};

module.exports = Editoras;
