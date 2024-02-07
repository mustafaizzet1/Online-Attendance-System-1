const Branch = require('./Branch');

module.exports = (sequelize, DataTypes) => {
  const Lectureinfo = sequelize.define("Lectureinfo", {
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
    // Define foreign key constraints
  });

  Lectureinfo.associate = (models) => {
    Lectureinfo.belongsTo(models.Lecture, {
      foreignKey: 'DERS_KODU'
    });
  };

  return Lectureinfo;
};
