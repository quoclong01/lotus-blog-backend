'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Posts',
        'cover',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn('Posts',
        'likes',
        {
          type: Sequelize.NUMBER
        }
      ),
      queryInterface.addColumn('Posts',
        'comments',
        {
          type: Sequelize.NUMBER
        }
      )
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Posts',
        'cover',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.removeColumn('Posts',
        'likes',
        {
          type: Sequelize.NUMBER
        }
      ),
      queryInterface.removeColumn('Posts',
        'comments',
        {
          type: Sequelize.NUMBER
        }
      )
    ])
  }
};
