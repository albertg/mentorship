'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('RealityChecks', 'weightageaccomplished');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('RealityChecks', 'weightageaccomplished',{
      type: Sequelize.INTEGER
    });
  }
};
