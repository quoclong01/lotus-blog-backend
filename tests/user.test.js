
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

describe('## user APIs', () => {
  describe(`# POST ${apiPath.users}`, () => {
    it('should be fail because age is a string', async () => {
      const res = await request(app)
        .post(apiPath.users)
        .send({
          name: 'AsianTech',
          age: 'aaa',
          comment: 'Test case is working'
        })
        .expect(HttpStatus.BAD_REQUEST)
    });
  })

  let user = {
    name: 'Quan Do',
    age: 23,
    comment: 'Test case is working'
  }
  describe(`# POST ${apiPath.users}`, () => {
    it('should create a new users', async () => {
      const res = await request(app)
        .post(apiPath.users)
        .send(user)
        .expect(HttpStatus.OK)
        user = res.body
    });
  })
  
  describe(`# GET ${apiPath.user(':userId')}`, () => {
    it('should get user detail', async () => {
      const res = await request(app)
        .get(apiPath.user(user.id))
        .expect(HttpStatus.OK)
      expect(res.body.name).to.equal(user.name);
      expect(res.body.age).to.equal(user.age);
    })
  })

  describe(`# PATCH ${apiPath.user(':userId')}`, () => {
    it('Should increase user age',  async () => {
      const res = await request(app)
        .patch(apiPath.user(user.id))
        .expect(HttpStatus.OK)
    })
  })

  describe(`# GET ${apiPath.users}`, () => {
    it('should get list of users', async () => {
      const res = await request(app)
        .get(apiPath.users)
        .expect(HttpStatus.OK)
      expect(res.body).to.be.an('array')
    })
  })

  describe(`# DELETE ${apiPath.user(':userId')}`, () => {
    it('should delete this user', async () => {
      const res = await request(app)
        .delete(apiPath.user(user.id))
        .expect(HttpStatus.OK)
      expect(res.body).to.equal(1);
    })
  })
})
