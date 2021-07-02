'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Posts',
        'status',
        {
          type: Sequelize.ENUM('private', 'public', 'draft'),
          unique: true
        }
      ),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Posts',
        'status',
        {
          type: Sequelize.ENUM('private', 'public'),
          unique: false
        }
      ),
    ])
  }
};
