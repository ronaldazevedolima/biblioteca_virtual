const Categorias = (sequelize, DataTypes) => {
  const criaCategorias = sequelize.define(
    'Categorias',
    {
      idCategoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nomeCategoria: {
        type: DataTypes.STRING,
      },
    },
    { 
      timestamps: false,
      underscored:true,
   }
  );

  criaCategorias.associate = ({ Livros }) => {
    criaCategorias.hasMany(Livros, { as: 'livros', foreignKey: 'idCategoria' });
  };
  return criaCategorias;
};

module.exports = Categorias;
