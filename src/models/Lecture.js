module.exports = (sequelize, DataTypes) => {
  const Lecture = sequelize.define("Lecture", {
    DERS_KODU: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    DERS_OZEL_KODU: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DERS_ADI: {
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

  Lecture.associate = (models) => {
  
  };

  return Lecture;
};
