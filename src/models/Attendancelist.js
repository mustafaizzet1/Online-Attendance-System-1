// models/Attendancelist.js
module.exports = (sequelize, DataTypes) => {
  const Attendancelist = sequelize.define('Attendancelist', {
    // ... model attributes
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

  Attendancelist.associate = (models) => {
    Attendancelist.belongsTo(models.Users, { foreignKey: 'creator_id' });
    Attendancelist.belongsTo(models.Session, { foreignKey: 'session_id' });
  };

  return Attendancelist;
};
