'use strict';
module.exports = (sequelize, DataTypes) => {
  var Discussion = sequelize.define('Discussion', {
    menteeId: {
      type: DataTypes.INTEGER
    },
    mentorId: {
      type: DataTypes.INTEGER
    },
    discussion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 1024]
      }
    },
    year:{
      type: DataTypes.INTEGER
    }
  }, {});
  Discussion.associate = function(models) {
    Discussion.belongsTo(models.Employee,{
      as: 'mentee'
    });
    Discussion.belongsTo(models.Employee,{
      as: 'mentor'
    });
  };
  return Discussion;
};