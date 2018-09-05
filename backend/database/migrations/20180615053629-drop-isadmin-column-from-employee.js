'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.removeColumn('Employees','isAdmin');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Employees', 'isAdmin', {
      type: Sequelize.BOOLEAN,
      allowNull: true
});
  }
};
