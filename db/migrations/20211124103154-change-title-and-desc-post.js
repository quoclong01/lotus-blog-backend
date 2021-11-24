'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Post',
        'description',
        {
          type: Sequelize.TEXT,
        }
      ),
      queryInterface.changeColumn('Post',
        'title',
        {
          type: Sequelize.TEXT,
        }
      ),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Post',
        'description',
        {
          type: Sequelize.STRING,
        }
      ),
      queryInterface.changeColumn('Post',
        'title',
        {
          type: Sequelize.STRING,
        }
      ),
    ])
  }
};
