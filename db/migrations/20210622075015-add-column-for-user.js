'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('User', 'password')
    ]);
  },

  down: async(queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('User', 'password')
    ])
  }
};
