'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Auth',
        'userId',
        {
          type: Sequelize.INTEGER,
          references: { model: 'Users', key: 'id' }
        }
      ),
      queryInterface.addColumn(
        'Post',
        'userId',
        {
          type: Sequelize.INTEGER,
          references: { model: 'Users', key: 'id' }
        }
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Auth', 'userId'),
      queryInterface.removeColumn('Post', 'userId')
    ]);
  }
};
