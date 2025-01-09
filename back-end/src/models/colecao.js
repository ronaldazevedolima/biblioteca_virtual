const Colecao = (sequelize, DataTypes) => {
  const criaColecao = sequelize.define(
    'Colecoes',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING,
      },
      volumes: {
        type: DataTypes.INTEGER,
      },
    },
    { 
      timestamps: false,
      underscored: true,
    }
  );

  criaColecao.associate = ({ Livros }) => {
    criaColecao.hasMany(Livros, { as: 'Livros', foreignKey: 'id' });
  };

  return criaColecao;
};

module.exports = Colecao;
