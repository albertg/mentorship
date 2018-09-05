'use strict';
module.exports = (sequelize, DataTypes) => {
  var ActionStatus = sequelize.define('ActionStatus', {
    statusName: DataTypes.STRING
  }, {});
  ActionStatus.associate = function(models) {
    // associations can be defined here
  };
  return ActionStatus;
};