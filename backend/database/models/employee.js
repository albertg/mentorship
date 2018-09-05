'use strict';
module.exports = (sequelize, DataTypes) => {
  var Employee = sequelize.define('Employee', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    mentorId: DataTypes.INTEGER,
    profileImage: DataTypes.STRING,
    employeeId: DataTypes.STRING,
    practiceManagerId: DataTypes.INTEGER,
    competency: DataTypes.STRING,
    locationId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {});
  Employee.associate = function(models) {
    // associations can be defined here
    Employee.belongsTo(models.Employee, {as: 'mentor', foreignKey: 'mentorId'});
    Employee.hasMany(models.Employee, {as: 'mentees', foreignKey: 'mentorId'});
    Employee.belongsToMany(models.Role, {as: 'roles', through:'EmployeeRoles', foreignKey:'employeeId'});    
    Employee.hasMany(models.Goal, {
      as: 'goals',
      foreignKey: 'menteeId'
    });
    Employee.belongsTo(models.Practice,{
      as: 'practice'
    });
    Employee.belongsTo(models.Employee,{
      as: 'PracticeManager',
      foreignKey: 'practiceManagerId'
    });
    Employee.belongsTo(models.Location,{
      as: 'Location'
    });
    Employee.belongsTo(models.Practice,{
      as: 'ManagersPractice',
      foreignKey: 'practiceId'
    });
    Employee.hasOne(models.Practice,{
      as: 'Practice',
      foreignKey: 'practiceHeadId'
    });
    Employee.hasMany(models.Employee,{
      as: 'PracticeManagerReportees',
      foreignKey: 'practiceManagerId'
    });
  };
  return Employee;
};