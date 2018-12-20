
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
  let user = {
    firstName: 'AsianTech',
    lastName: 'Quan'
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
      expect(res.body.firstName).to.equal(user.firstName);
      expect(res.body.lastName).to.equal(user.lastName);
    })
  })

  describe(`# PUT ${apiPath.user(':userId')}`, () => {
    it('Should return user be edited',  async () => {
      const res = await request(app)
        .put(apiPath.user(user.id))
        .send({
          firstName: 'Edited',
          lastName: 'Done'
        })
        .expect(HttpStatus.OK)
    })
  })

  describe(`# GET ${apiPath.users}`, () => {
    it('should get all users', async () => {
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
