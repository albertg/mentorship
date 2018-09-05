'use strict';
module.exports = (sequelize, DataTypes) => {
  var BusinessUnit = sequelize.define('BusinessUnit', {
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        len: [1, 150]
      }
    }
  }, {});
  BusinessUnit.associate = function(models) {
    BusinessUnit.hasMany(models.Practice,{
      as: "Practices"
    });
  };
  return BusinessUnit;
};