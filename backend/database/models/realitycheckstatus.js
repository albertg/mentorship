'use strict';
module.exports = (sequelize, DataTypes) => {
  var RealityCheckStatus = sequelize.define('RealityCheckStatus', {
    statusName: DataTypes.STRING
  }, {});
  RealityCheckStatus.associate = function(models) {
    // associations can be defined here
  };
  return RealityCheckStatus;
};