const Editoras = (sequelize, DataTypes) => {
  const criaEditoras = sequelize.define(
    'Editoras',
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
      underscored: true,
    }
  );

  criaEditoras.associate = ({ Livros }) => {
    criaEditoras.hasMany(Livros, { as: 'Livros', foreignKey: 'idEditora' });
  };
  return criaEditoras;
};

module.exports = Editoras;
