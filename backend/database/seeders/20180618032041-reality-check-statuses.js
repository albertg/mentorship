'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('RealityCheckStatuses',[{
      statusName:'Not Started',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      statusName:'In Progress',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      statusName:'Approved',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      statusName:'Rejected',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('RealityCheckStatuses', null, {});
  }
};
