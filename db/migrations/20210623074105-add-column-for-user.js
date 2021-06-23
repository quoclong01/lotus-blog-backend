'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Users',
        'phone',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn('Users',
        'gender',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn('Users',
        'dob',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn('Users',
        'lastName',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.renameColumn('Users',
        'username', 'firstName'
      )
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users',
        'phone',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.removeColumn('Users',
        'gender',
        {
          type: Sequelize.ENUM('male', 'female', 'other'),
        }
      ),
      queryInterface.removeColumn('Users',
        'dob',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.removeColumn('Users',
        'lastName',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.renameColumn('Users',
        'firstName', 'username'
      )
    ])
  }
};
