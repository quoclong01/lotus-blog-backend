'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Comments',
        'comment',
        {
          type: Sequelize.TEXT,
        }
      ),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Comments',
        'comment',
        {
          type: Sequelize.STRING,
        }
      ),
    ])
  }
};
