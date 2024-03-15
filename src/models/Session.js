module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define("Session", {
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sessiontype: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        latitude :{
            type:DataTypes.DOUBLE,
            allowNull:false
          },
      
          longitude:{
            type:DataTypes.DOUBLE,
            allowNull:false
          },
          active:{
            type:DataTypes.SMALLINT,
            allowNull:false
          },
          status:{
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

    Session.associate = (models) => {
        Session.belongsTo(models.Users, { foreignKey: 'createdby' });
        Session.belongsTo(models.Lectureinfo);
        Session.belongsToMany(models.Users, {
            through: "Authorizedpersons",
            foreignKey: "Sessionid",
          });
          Session.belongsToMany(models.Studentlist, {
            through: "Attendancelist",
            foreignKey: "Sessionid",
          });
    };

    return Session;
};
