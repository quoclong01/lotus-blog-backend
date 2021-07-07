'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Auth',
        'password',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      ),
      queryInterface.addColumn('Auth',
        'idToken',
        {
          type: Sequelize.STRING
        }
      ),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Auth',
        'password',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      ),
      queryInterface.removeColumn('Auth',
        'idToken',
        {
          type: Sequelize.STRING
        }
      ),
    ])
  }
};
