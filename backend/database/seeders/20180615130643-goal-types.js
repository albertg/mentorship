'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('GoalTypes',[{
      typeName:'ShortTerm',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      typeName:'MediumTerm',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      typeName:'LongTerm',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('GoalTypes', null, {});
  }
};
