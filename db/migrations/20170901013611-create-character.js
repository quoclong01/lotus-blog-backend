'use strict';
module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} sequelize
   * @returns
   */
  up: (queryInterface, sequelize) => {
    return queryInterface.createTable('Character', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize.INTEGER
      },
      firstName: {
        type: sequelize.STRING
      },
      lastName: {
        type: sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: sequelize.DATE(3),
        defaultValue: sequelize.literal('NOW(3)')
      },
      updatedAt: {
        allowNull: false,
        type: sequelize.DATE(3),
        defaultValue: sequelize.literal('NOW(3) ON UPDATE NOW(3)')
      }
    })
  },
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} sequelize
   * @returns
   */
  down: (queryInterface, sequelize) => {
    return queryInterface.dropTable('Character');
  }
};
