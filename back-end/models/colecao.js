const Colecao = (sequelize, DataTypes) => {
  const createColecoes = sequelize.define(
    'colecoes',
    {
      // idColecao: {
      //   type: DataTypes.INTEGER,
      // },
      nome_colecao: {
        type: DataTypes.STRING,
      },
      volumes: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false },
  );

  createColecoes.associate = (models) => {
    createColecoes.hasMany(models.livros, { as: 'livros', foreignKey: 'id_Colecao' });
  };

  return createColecoes;
};

module.exports = Colecao;
