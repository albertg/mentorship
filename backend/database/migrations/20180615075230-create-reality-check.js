'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RealityChecks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      menteeId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Employees',
          key: 'id'
        }
      },
      mentorId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Employees',
          key: 'id'
        }
      },
      goalId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Goals',
          key:'id'
        }
      },
      menteeComments: {
        type: Sequelize.STRING
      },
      mentorComments: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.INTEGER,
        references:{
          model:'RealityCheckStatuses',
          key:'id'
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
    return queryInterface.dropTable('RealityChecks');
  }
};