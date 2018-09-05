'use strict';
module.exports = (sequelize, DataTypes) => {
  var RealityCheck = sequelize.define('RealityCheck', {
    menteeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mentorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    goalId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    menteeComments: DataTypes.STRING,
    mentorComments: DataTypes.STRING,
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  RealityCheck.associate = function(models) {
    RealityCheck.belongsTo(models.Employee,{
      as: 'mentee'
    });
    RealityCheck.belongsTo(models.Employee,{
      as: 'mentor'
    });
    RealityCheck.belongsTo(models.Goal,{
      as: 'goal'
    });
    RealityCheck.belongsTo(models.RealityCheckStatus,{
      as: 'status'
    });
    RealityCheck.hasMany(models.Discussion, {
      as: 'ReferenceDiscussion'
    });
  };
  return RealityCheck;
};