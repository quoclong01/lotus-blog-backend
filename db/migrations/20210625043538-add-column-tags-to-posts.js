'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Posts',
      'tags', 
      {
        type: DataTypes.STRING,
        defaultValue: ''
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Posts', 
      'tags', 
      {
        type: DataTypes.STRING,
        defaultValue: ''
      });
  }
};
