const Editoras = (sequelize, DataTypes) => {
  const criaEditoras = sequelize.define(
    'Editoras',
    {
      idEditora: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nomeEditora: {
        type: DataTypes.STRING,
      },
    },
    { 
      timestamps: false,
      underscored: true,
    }
  );

  criaEditoras.associate = ({ Livros }) => {
    criaEditoras.hasMany(Livros, { as: 'livros', foreignKey: 'idEditora' });
  };
  return criaEditoras;
};

module.exports = Editoras;
