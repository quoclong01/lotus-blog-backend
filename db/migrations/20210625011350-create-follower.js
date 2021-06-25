'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Followers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      status: {
        type: Sequelize.ENUM('follow', 'unfollow', 'block', 'normal'),
        allowNull: false,
        defaultValue: 'normal'
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' }
      },
      followerId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Followers');
  }
};
