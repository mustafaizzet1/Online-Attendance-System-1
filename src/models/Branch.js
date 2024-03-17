module.exports = (sequelize, DataTypes) => {
  const Branch = sequelize.define("Branch", {
    SUBE_KODU: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      allowNull: false,
    },
    OGR_BIRIM_KODU: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      allowNull: false,
    },
    SUBE_ADI: {
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

  Branch.associate = (models) => {
    Branch.hasMany(models.Lectureinfo, {
      foreignKey: 'SUBE_KODU',
    });
   
  };


  return Branch;
};
