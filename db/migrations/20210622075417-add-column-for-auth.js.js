'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.allColumn(
        'Auth',
        'password',
        {
          type: DataTypes.STRING,
          allowNull: false
        }
      ),
      queryInterface.renameColumn(
        'User',
        'saveToken',
        'accessToken'
      )
    ])
  },

  down: async(queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Auth', 'password'),
      queryInterface.removeColumn('User', 'accessToken', 'saveToken')
    ])
  }
};
