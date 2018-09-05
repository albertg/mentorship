'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('Actions', 'pendingApproval',{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true
      }),
      queryInterface.addColumn('Actions', 'statusChangeReason',{
        type: Sequelize.TEXT,
        allowNull: true
      })
    ];
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.removeColumn('Actions', 'pendingApproval'),
      queryInterface.removeColumn('Actions', 'statusChangeReason')
    ];
  }
};
