'use strict';
const path = require('path');
const csv = require('csvtojson')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const csvFilePath = path.join(__dirname, '../csv/Posts.csv');
    return csv()
      .fromFile(csvFilePath)
      .then((rows) => {
        rows.forEach(x => {
          x.userId = +x.userId;
        });
        return queryInterface.bulkInsert('Posts', rows, {});
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
