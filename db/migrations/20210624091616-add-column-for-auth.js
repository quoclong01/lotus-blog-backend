'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Auth',
        'resetToken',
        {
          type: Sequelize.STRING
        }
      )
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Auth',
        'resetToken',
        {
          type: Sequelize.STRING
        }
      )
    ])
  }
};
