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
          longitude:{
            type:DataTypes.DOUBLE,
            allowNull:false
          },
          OGRENCI_NO:{
            type:DataTypes.STRING,
            allowNull:false
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

    Studentlist.associate = (models) => {
       Studentlist.belongsTo(models.Submission_type);     
    };

    return Studentlist;
};