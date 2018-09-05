'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Actions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      actionText: {
        type: Sequelize.TEXT
      },
      actionStatusId: {
        type: Sequelize.INTEGER,
        references:{
          model:'ActionStatuses',
          key:'id'
        }
      },
      goalId:{
        type: Sequelize.INTEGER,
        references:{
          model:'Goals',
          key:'id'
        }
      },
      createdById:{
        type: Sequelize.INTEGER,
        references:{
          model:'Employees',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Actions');
  }
};