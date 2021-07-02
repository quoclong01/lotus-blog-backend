'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Posts',
        'status',
        {
          type: Sequelize.ENUM('private', 'public', 'draft'),
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
        }
      ),
    ])
  }
};
