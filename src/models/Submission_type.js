
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
        Submission_type.associate = (models) => {
          // Diğer ilişkiler
      
          Submission_type.hasMany(models.Attendancelist, {
            foreignKey: 'submissionTypeId', // Attendancelist modelinde Submission_type modeline referans veren foreign key
          });
        };
      


    return Submission_type;
  };
  