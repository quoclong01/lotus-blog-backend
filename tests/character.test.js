
const HttpStatus = require('http-status')
const request = require('supertest-as-promised')
const chai = require('chai')
const expect = chai.expect
const apiPath = require('./api-path')
const app = require('../src')
/**
 * root level hooks
 */
chai.config.includeStack = true;

describe('## character APIs', () => {
  describe(`# POST ${apiPath.characters}`, () => {
    it('should be fail because age is a string', async () => {
      const res = await request(app)
        .post(apiPath.characters)
        .send({
          name: 'AsianTech',
          age: 'aaa',
          comment: 'Test case is working'
        })
        .expect(HttpStatus.BAD_REQUEST)
    });
  })

  let character = {
    name: 'Quan Do',
    age: 23,
    comment: 'Test case is working'
  }
  describe(`# POST ${apiPath.characters}`, () => {
    it('should create a new characters', async () => {
      const res = await request(app)
        .post(apiPath.characters)
        .send(character)
        .expect(HttpStatus.OK)
        character = res.body
    });
  })
  
  describe(`# GET ${apiPath.character(':characterId')}`, () => {
    it('should get character detail', async () => {
      const res = await request(app)
        .get(apiPath.character(character.id))
        .expect(HttpStatus.OK)
      expect(res.body.name).to.equal(character.name);
      expect(res.body.age).to.equal(character.age);
    })
  })

  describe(`# PATCH ${apiPath.character(':characterId')}`, () => {
    it('Should increase character age',  async () => {
      const res = await request(app)
        .patch(apiPath.character(character.id))
        .expect(HttpStatus.OK)
    })
  })

  describe(`# GET ${apiPath.characters}`, () => {
    it('should get list of characters', async () => {
      const res = await request(app)
        .get(apiPath.characters)
        .expect(HttpStatus.OK)
      expect(res.body).to.be.an('array')
    })
  })

  describe(`# DELETE ${apiPath.character(':characterId')}`, () => {
    it('should delete this character', async () => {
      const res = await request(app)
        .delete(apiPath.character(character.id))
        .expect(HttpStatus.OK)
      expect(res.body).to.equal(1);
    })
  })
})
