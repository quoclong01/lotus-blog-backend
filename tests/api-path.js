const root = '/api';
const users = `${root}/users`;

module.exports = {
  root,
  users,
  user(userId) {
    return `${users}/${userId}`;
  }
};
