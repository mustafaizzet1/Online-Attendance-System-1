const Submission_type = require("./Submission_type");

module.exports = (sequelize, DataTypes) => {
    const Studentlist = sequelize.define("Studentlist", {
      OGRENCI_NO:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true
      },
     AD:{
        type:DataTypes.STRING,
        allowNull:false,
      },
     SOYAD:{
        type:DataTypes.STRING,
        allowNull:false,
      },
     CINSIYET:{
        type:DataTypes.STRING,
        allowNull:false,
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

    return Studentlist;
};