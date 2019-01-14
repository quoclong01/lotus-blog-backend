const root = '/api';
const characters = `${root}/characters`;

module.exports = {
  root,
  characters,
  character(characterId) {
    return `${characters}/${characterId}`;
  }
};
