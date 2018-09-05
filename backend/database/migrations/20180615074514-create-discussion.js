'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Discussions', {
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
      discussion: {
        type: Sequelize.STRING(1024)
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
    return queryInterface.dropTable('Discussions');
  }
};