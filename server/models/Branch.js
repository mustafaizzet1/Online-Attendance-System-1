module.exports = (sequelize, DataTypes) => {
  const Branch = sequelize.define("Branch", {
    OGR_BIRIM_KODU: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      allowNull: false,
    },
    SUBE_KODU: {
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
   
  };


  return Branch;
};
