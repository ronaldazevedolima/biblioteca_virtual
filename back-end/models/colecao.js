const Colecao = (sequelize, DataTypes) => {
  const createColecao = sequelize.define(
    'colecoes',
    {
      nome_colecao: {
        type: DataTypes.STRING,
      },
      volumes: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false }
  );

  createColecao.associate = (models) => {
    createColecao.hasMany(models.livros, { as: 'livros', foreignKey: 'id_Colecao' });
  };

  return createColecao;
};

module.exports = Colecao;
