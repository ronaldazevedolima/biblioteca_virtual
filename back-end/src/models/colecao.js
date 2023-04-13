const Colecao = (sequelize, DataTypes) => {
  const criaColecao = sequelize.define(
    'Colecoes',
    {
      idColecao: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nomeColecao: {
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
    criaColecao.hasMany(Livros, { as: 'livros', foreignKey: 'id_Colecao' });
  };

  return criaColecao;
};

module.exports = Colecao;
