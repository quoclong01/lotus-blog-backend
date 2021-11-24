'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Posts',
        'description',
        {
          type: Sequelize.TEXT,
        }
      ),
      queryInterface.changeColumn('Posts',
        'title',
        {
          type: Sequelize.TEXT,
        }
      ),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('Posts',
        'description',
        {
          type: Sequelize.STRING,
        }
      ),
      queryInterface.changeColumn('Posts',
        'title',
        {
          type: Sequelize.STRING,
        }
      ),
    ])
  }
};
