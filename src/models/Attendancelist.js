const Studentlist = require("./Studentlist");

// models/Attendancelist.js
module.exports = (sequelize, DataTypes) => {
  const Attendancelist = sequelize.define('Attendancelist', {
    absence: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0 // absence için varsayılan değer olarak 0

    },
    operation_reason:{
      type:DataTypes.STRING,
      allowNull:true,
    },
    latitude :{
      type:DataTypes.DOUBLE,
      allowNull:false,
      defaultValue: 0.0 // absence için varsayılan değer olarak 0

    },
    longitude:{
      type:DataTypes.DOUBLE,
      allowNull:false,
      defaultValue: 0.0 // absence için varsayılan değer olarak 0

    },
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
    Attendancelist.belongsTo(models.Submission_type, {
    });
  };


  return Attendancelist;
};
