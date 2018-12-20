
/**
 * @param {Sequelize} sequelize
 * @param {DataTypes} dataTypes
 */
module.exports = (sequelize, dataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: dataTypes.STRING
    },
    lastName: {
      type: dataTypes.STRING
    }
  }, {});
  return User;
}
