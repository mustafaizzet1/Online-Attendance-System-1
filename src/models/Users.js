module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    KULLANICI_KODU: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    PAROLA: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }, {
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt',
  });

  Users.associate = (models) => {
    Users.hasMany(models.Lectureinfo, {
      foreignKey: 'KULLANICI_KODU'
    });
  };
  
  return Users;
};
