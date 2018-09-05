'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Goals', 'weightage');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Goals', 'weightage',{
      type: Sequelize.INTEGER
    })
  }
};
