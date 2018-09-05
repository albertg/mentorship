'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Roles',[{
      roleName:'admin',
      priority: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      roleName:'buadmin',
      priority: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      roleName:'practicehead',
      priority: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      roleName:'practicemanager',
      priority: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      roleName: 'mentor',
      priority: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      roleName: 'mentee',
      priority: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
