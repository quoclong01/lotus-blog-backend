'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Posts',
        'recommend',
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        }
      )
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Posts',
        'recommend',
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        }
      )
    ])
  }
};
