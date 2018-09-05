'use strict';
module.exports = (sequelize, DataTypes) => {
  var Practice = sequelize.define('Practice', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 128]
      }
    },
    practiceHeadId: DataTypes.INTEGER
  }, {});
  Practice.associate = function(models) {
    Practice.belongsTo(models.Employee,{
      as: 'practiceHead'
    });
    Practice.belongsTo(models.BusinessUnit,{
      as: 'BusinessUnit'
    });
    Practice.hasMany(models.Employee,{
      as: 'PracticeManagers'
    });
  };
  return Practice;
};