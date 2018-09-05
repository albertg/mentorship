'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('Employees', 'employeeId',{
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Employees', 'practiceManagerId',{
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('Employees', 'designation',{
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Employees', 'competency',{
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Employees', 'locationId',{
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('Employees', 'title',{
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Employees', 'gender',{
        type: Sequelize.STRING
      })
    ];
  },

  down: (queryInterface) => {
    return [
      queryInterface.removeColumn('Employees', 'employeeId'),
      queryInterface.removeColumn('Employees', 'practiceManagerId'),
      queryInterface.removeColumn('Employees', 'designation'),
      queryInterface.removeColumn('Employees', 'competency'),
      queryInterface.removeColumn('Employees', 'locationId'),
      queryInterface.removeColumn('Employees', 'title'),
      queryInterface.removeColumn('Employees', 'gender')
    ];
  }
};
