'use strict';
module.exports = (sequelize, DataTypes) => {
  var GoalType = sequelize.define('GoalType', {
    typeName: DataTypes.STRING
  }, {});
  GoalType.associate = function(models) {
    // associations can be defined here
  };
  return GoalType;
};