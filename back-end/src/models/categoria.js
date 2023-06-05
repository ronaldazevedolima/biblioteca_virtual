const Categorias = (sequelize, DataTypes) => {
  const criaCategorias = sequelize.define(
    'Categorias',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING,
      },
    },
    { 
      timestamps: false,
      underscored:true,
    }
  );

  criaCategorias.associate = ({ Livros }) => {
    criaCategorias.hasMany(Livros, { as: 'Livros', foreignKey: 'idCategoria' });
  };
  return criaCategorias;
};

module.exports = Categorias;
