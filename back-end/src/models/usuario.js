const Usuarios = (sequelize, DataTypes) => {
  const criaUsuario = sequelize.define(
    'Usuarios',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      senha: {
        type: DataTypes.STRING,
      },
      classificacao: {
        type: DataTypes.STRING,
      },
    },
    { 
      timestamps: false,
      underscored: true
    }
  );
  
   
  return criaUsuario;
};

module.exports = Usuarios;