'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Employees', 'practiceId',{
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true
    });
  },

  down: (queryInterface) => {
    queryInterface.removeColumn('Employees', 'practiceId');
  }
};
