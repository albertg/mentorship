'use strict';
module.exports = (sequelize, DataTypes) => {
  var Goal = sequelize.define('Goal', {
    menteeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mentorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    goalDescription: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 256]
      }
    },
    goalTypeId:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    year:{
      type: DataTypes.INTEGER
    }
  }, {});
  Goal.associate = function(models) {    
    Goal.belongsTo(models.Employee,{
      as: 'mentee'
    });
    Goal.belongsTo(models.Employee,{
      as: 'mentor'
    });
    Goal.belongsTo(models.GoalType,{
      as: 'goalType'
    });
    Goal.hasMany(models.Action, {
      as: 'actions'
    });
  };
  return Goal;
};