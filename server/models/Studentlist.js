const Submission_type = require("./Submission_type");

module.exports = (sequelize, DataTypes) => {
    const Studentlist = sequelize.define("Studentlist", {
        absence: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          operation_reason:{
            type:DataTypes.STRING,
            allowNull:false,
          },
          latitude :{
            type:DataTypes.DOUBLE,
            allowNull:false
          },
          longtitude:{
            type:DataTypes.DOUBLE,
            allowNull:false
          },
          OGRENCI_NO:{
            type:DataTypes.STRING,
            allowNull:false
          }

    });

    Studentlist.associate = (models) => {
       Studentlist.belongsTo(models.Submission_type);     
    };

    return Studentlist;
};