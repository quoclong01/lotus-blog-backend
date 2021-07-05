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
    ])
  }
};
