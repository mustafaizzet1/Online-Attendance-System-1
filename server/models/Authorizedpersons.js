
module.exports = (sequelize, DataTypes) => {
    const Authorizedpersons = sequelize.define("Authorizedpersons",{

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



    return Authorizedpersons;
  };
  