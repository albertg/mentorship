'use strict';
module.exports = (sequelize, DataTypes) => {
  var EmployeeRoles = sequelize.define('EmployeeRoles', {
    employeeId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER
  }, {});
  EmployeeRoles.associate = function(models) {
    // associations can be defined here
  };
  return EmployeeRoles;
};