'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Users',
        'followers',
        {
          type: Sequelize.INTEGER,
          defaultValue: 0
        }
      ),
      queryInterface.addColumn('Users',
        'followings',
        {
          type: Sequelize.INTEGER,
          defaultValue: 0
        }
      )
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users',
        'followers',
        {
          type: Sequelize.INTEGER,
          defaultValue: 0
        }
      ),
      queryInterface.removeColumn('Users',
        'followings',
        {
          type: Sequelize.INTEGER,
          defaultValue: 0
        }
      )
    ])
  }
};
