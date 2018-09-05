'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('ActionStatuses',[{
      statusName:'Not Started',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      statusName:'In Progress',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      statusName:'Completed',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('ActionStatuses', null, {});
  }
};
