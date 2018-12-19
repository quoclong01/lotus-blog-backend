
const HttpStatus = require('http-status')
const request = require('supertest-as-promised')
const fastify = require('../src')
const models = require('../src/models')
const boom = require('boom')
const fp = require('fastify-plugin')
const chai = require('chai')
const apiPath = require('./api-path');
const expect = chai.expect 

/**
 * root level hooks
 */

describe('## user APIs', () => {
  let user = {
    firstName: 'AsianTech',
    lastName: 'Quan'
  }
  describe(`# POST ${apiPath.users}`, () => {
    it('should create a new users', async () => {
      const res = await fastify.inject({
        method: 'POST',
        url: `${apiPath.users}`,
        headers: {
          'Content-type': 'application/json'
        },
        payload: user
      })
      const parseData = JSON.parse(res.body)
      expect(res.statusCode, 200)
      user = parseData
    })
  })
  
  describe(`# GET ${apiPath.user(':userId')}`, () => {
    it('should get user detail', async () => {
      const res = await fastify.inject({
        method: 'GET',
        url: `${apiPath.user(user.id)}`
      })
      const parseData = JSON.parse(res.body)
      expect(parseData.firstName).to.equal(user.firstName);
      expect(parseData.lastName).to.equal(user.lastName);
    })
  })

  describe(`# PUT ${apiPath.user(':userId')}`, () => {
    it('Should return user be edited',  async () => {
      const res = await fastify.inject({
        method: 'PUT',
        url: `${apiPath.user(user.id)}`,
        payload: {
          firstName: 'Edited',
          lastName: 'Done'
        }
      })
      expect(res.body).to.equal('[1]');
    })
  })

  describe(`# GET ${apiPath.users}`, () => {
    it('should get all users', async () => {
      const res = await fastify.inject({
        method: 'GET',
        url: `${apiPath.users}`
      })
      const parseData = JSON.parse(res.body)
      expect(parseData).to.be.an('array')
    })
  })

  describe(`# DELETE ${apiPath.user(':userId')}`, () => {
    it('should delete this user', async () => {
      const res = await fastify.inject({
        method: 'DELETE',
        url: `${apiPath.user(user.id)}`
      })
      expect(res.body).to.equal('1');
    })
  })
})
