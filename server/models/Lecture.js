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
  });

  Lecture.associate = (models) => {
  
  };

  return Lecture;
};
