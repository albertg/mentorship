'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('Goals', 'year',{
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('Goals', 'weightage',{
        type: Sequelize.INTEGER
      })
    ];
  },

  down: (queryInterface) => {
    return [
      queryInterface.removeColumn('Goals', 'year'),
      queryInterface.removeColumn('Goals', 'weightage')
    ];
  }
};
