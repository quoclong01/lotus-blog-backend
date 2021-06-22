'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Auth',
        'userId',
        {
          type: Sequelize.INTEGER,
          references: { model: 'User', key: 'id' }
        }
      ),
      queryInterface.addColumn(
        'Post',
        'userId',
        {
          type: Sequelize.INTEGER,
          references: { model: 'User', key: 'id' }
        }
      ),
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
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Auth', 'userId'),
      queryInterface.removeColumn('Auth', 'password'),
      queryInterface.removeColumn('Auth', 'accessToken', 'saveToken'),
      queryInterface.removeColumn('Post', 'userId')
    ]);
  }
};
