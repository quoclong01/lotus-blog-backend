'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Posts',
      'tags', 
      {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Posts', 
      'tags', 
      {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      });
  }
};
