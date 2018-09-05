'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Practices', 'businessUnitId',{
      type: Sequelize.INTEGER
    });
  },

  down: (queryInterface) => {
    queryInterface.removeColumn('Practices', 'businessUnitId');
  }
};
