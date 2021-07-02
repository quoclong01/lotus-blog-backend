'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Users',
        'displayName',
        {
          type: Sequelize.STRING,
          unique: true
        }
      ),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Users',
        'displayName',
        {
          type: Sequelize.STRING,
          unique: false
        }
      ),
    ])
  }
};
