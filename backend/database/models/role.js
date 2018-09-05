'use strict';
module.exports = (sequelize, DataTypes) => {
  var Role = sequelize.define('Role', {
    roleName: DataTypes.STRING,
    priority: DataTypes.INTEGER
  }, {});
  Role.associate = function(models) {    
  };
  return Role;
};