'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Goals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      menteeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'Employees',
          key: 'id'
        }
      },
      mentorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Employees',
          key:'id'
        }
      },
      goalDescription: {
        type: Sequelize.STRING(256),
        allowNull: false
      },
      goalTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'GoalTypes',
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
    return queryInterface.dropTable('Goals');
  }
};