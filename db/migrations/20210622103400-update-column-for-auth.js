'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Auth',
        'password',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      ),
      queryInterface.renameColumn(
        'Auth',
        'saveToken',
        'accessToken'
      )
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Auth', 'password'),
      queryInterface.removeColumn('Auth', 'accessToken', 'saveToken')
    ])
  }
};
