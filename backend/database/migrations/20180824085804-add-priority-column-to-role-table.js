'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Roles', 'priority',{
      type: Sequelize.INTEGER,
      allowNull: false
    });
  },

  down: (queryInterface) => {
    queryInterface.removeColumn('Roles', 'priority');
  }
};
