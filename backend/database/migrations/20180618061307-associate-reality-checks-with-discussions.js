'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Discussions','realityCheckId',{
      type: Sequelize.INTEGER,
      allowNull: true,
      references:{
        model:'RealityChecks',
        key:'id'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Discussions', 'realityCheckId');
  }
};
