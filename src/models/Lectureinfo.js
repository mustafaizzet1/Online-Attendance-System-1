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
    Lectureinfo.belongsTo(models.Branch, {
      foreignKey: 'SUBE_KODU', // Branch modelindeki SUBE_KODU ile eşleşecek foreign key
    });
    Lectureinfo.belongsTo(models.Department, {
      foreignKey: 'OGR_BIRIM_KODU', // Department modelindeki OGR_BIRIM_KODU alanı ile eşleştirme
    });
    Lectureinfo.hasMany(models.Session, {
      foreignKey: 'LectureinfoId'
    });
    Lectureinfo.hasMany(models.Studentlist, { foreignKey: 'LectureinfoId' });
    Lectureinfo.belongsTo(models.Term, {
      foreignKey: 'OGRETIM_DONEMI_KODU', // Term modelindeki eşleşen foreign key
    });
  };

  return Lectureinfo;
};
