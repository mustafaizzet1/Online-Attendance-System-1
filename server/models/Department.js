module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define("Department", {
    OGR_BIRIM_KODU: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    BIRIM_ADI: {
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
    updatedAt: 'updatedAt', // Specify the name of the updatedAt column
    createdAt: 'createdAt', // Specify the name of the createdAt column
  });

  Department.associate = (models) => {

  };

  return Department;
};
