const Lecture = require("./Lecture");

module.exports = (sequelize, DataTypes) => {
    const Term = sequelize.define("Term", {
        OGRETIM_DONEMI_KODU: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull: false,
      },
      OGRETIM_DONEMI_ADI: {
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
  
    Term.associate = (models) => {
        Term.hasMany(models.Lectureinfo,{
          foreignKey:'OGRETIM_DONEMI_KODU'
        });
     };
    return Term;
  };