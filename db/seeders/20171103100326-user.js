const fs = require('fs');
const csv = require('csv');
const path = require('path');

const User = require('../../src/models').User;

const input = fs.createReadStream(path.join(__dirname, '../csv/00_User.csv'));
const parser = csv.parse({
  delimiter: ',',
  columns: true
});

const importData = input.pipe(parser).on('data', (row) => {
  importData.pause();
  User.create({
    id: row.id,
    firstName: row.firstName,
    lastName: row.lastName,
    avatar: row.avatar
  })
    .then(() => {
      console.log('Record created');
    })
    .catch((err) => {
      console.log(`Error encountered: ${err}`);
    });
  importData.resume();
}).on('end', () => {
  console.log('We are done!');
})
  .on('error', (error) => {
    console.log(error);
  });

module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} sequelize
   * @returns
   */
  async up(queryInterface, sequelize) {
    await importData;
    return true;
  },
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} sequelize
   * @returns
   */
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('User', null, {})
};

