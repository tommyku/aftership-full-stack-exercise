/* eslint-env mocha */
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const bcrypt = require('bcrypt');
const { app } = require('../test_helper');
const { User } = require('../test_helper').model;

chai.use(chaiHttp);

describe('User', () => {
  describe('/user/sign_up', () => {
    it('responds with status 200', function(done) {
      const userData = {
        username: (new Date()).getTime(),
        password: 'password',
        appId: '123'
      };

      chai.request(app)
        .post('/user/sign_up')
        .send(userData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.success.username).to.equal(userData.username);
          expect(res.body.success.token).not.to.be.empty;
          done();
        });
    });

    it('responds with status 422 for invalid input', function(done) {
      const userData = {
        username: (new Date()).getTime(),
        password: '',
        appId: '123'
      };

      chai.request(app)
        .post('/user/sign_up')
        .send(userData)
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.errors.password.msg).to.equal('Invalid value');
          done();
        });
    });

    it('responds with status 409 for conflicting usernames', function(done) {
      const userData = {
        username: (new Date()).getTime(),
        password: 'password',
        appId: '123'
      };

      User.create(userData).then(() => {
        chai.request(app)
          .post('/user/sign_up')
          .send(userData)
          .end((err, res) => {
            expect(res).to.have.status(409);
            expect(res.body.errors.username.msg).to.equal('exists');
            done();
          });
      });
    });
  });

  describe('/user/sign_in', () => {
    it('responds with status 200', function(done) {
      const userData = {
        username: (new Date()).getTime(),
        password: 'password',
        appId: '123'
      };

      User.create({
        username: userData.username,
        passwordDigest: bcrypt.hashSync(userData.password, 10),
        appId: userData.appId
      }).then(() => {
        chai.request(app)
          .post('/user/sign_in')
          .send(userData)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.success.username).to.equal(userData.username);
            expect(res.body.success.token).not.to.be.empty;
            done();
          });
      });
    });

    it('responds with status 422 for invalid parameters', function(done) {
      const userData = {
        username: (new Date()).getTime(),
        password: '',
        appId: '123'
      };

      chai.request(app)
        .post('/user/sign_in')
        .send(userData)
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.errors.password.msg).to.equal('Invalid value');
          done();
        });
    });

    it('responds with status 401 for invalid password', function(done) {
      const userData = {
        username: (new Date()).getTime(),
        password: 'password',
        appId: '123'
      };

      User.create({
        username: userData.username,
        passwordDigest: bcrypt.hashSync(userData.password, 10),
        appId: userData.appId
      }).then(() => {
        chai.request(app)
          .post('/user/sign_in')
          .send({
            username: userData.username,
            password: '12341234'
          })
          .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body.errors.password.msg).to.equal('is invalid');
            done();
          });
      });
    });
  });
});
