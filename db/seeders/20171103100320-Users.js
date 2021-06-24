'use strict';
const path = require('path');
const csv = require('csvtojson')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const csvFilePath = path.join(__dirname, '../csv/Users.csv');
    return csv()
      .fromFile(csvFilePath)
      .then((rows) => {
        return queryInterface.bulkInsert('Users', rows, {});
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};