'use strict';
module.exports = (sequelize, DataTypes) => {
  var Action = sequelize.define('Action', {
    actionText: DataTypes.STRING,
    actionStatusId: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    goalId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdById: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pendingApproval:{
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    statusChangeReason:{
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {});
  Action.associate = function(models) {    
    Action.belongsTo(models.ActionStatus,{
      as: 'actionStatus'
    });
    Action.belongsTo(models.Employee, {
      as: 'createdBy'
    });
  };
  return Action;
};