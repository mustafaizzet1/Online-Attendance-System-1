
module.exports = (sequelize, DataTypes) => {
    const Submission_type = sequelize.define("Submission_type",{
        submission_type: {
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
 


    return Submission_type;
  };
  