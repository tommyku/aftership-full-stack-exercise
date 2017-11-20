/* eslint-env mocha */
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const bcrypt = require('bcrypt');
const { app, jwtSign } = require('../test_helper');
const { User, UserCurrency, Currency } = require('../test_helper').model;

chai.use(chaiHttp);

describe('UserCurrency', () => {
  describe('get /usercurrency/', () => {
    it('responsd with status 200', (done) => {
      const userData = {
        username: (new Date()).getTime(),
        passwordDigest: '',
        appId: ''
      };

      Promise.all([
        Currency.findOne(),
        User.create(userData)
      ]).then(([currency, user]) => {
        UserCurrency.create({ userId: user.id, currencyId: currency.id })
          .then(() => {
            chai.request(app)
              .get('/usercurrency')
              .set('x-access-token', jwtSign(userData.username))
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.success.currencies.length).to.equal(1);
                expect(res.body.success.currencies[0].code).to.equal(currency.code);
                done();
              });
          });
      });
    });

    it('responsd with status 403 on missing token', (done) => {
      chai.request(app)
        .get('/usercurrency')
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body.errors.token.msg).to.equal('is required');
          done();
        });
    });

    it('responsd with status 403 on invalid token', (done) => {
      chai.request(app)
        .get('/usercurrency')
        .set('x-access-token', 'hahahaha')
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body.errors.token.msg).to.equal('is invalid');
          done();
        });
    });
  });

  describe('post /usercurrency/', () => {
    it('responsd with status 201', (done) => {
      const userData = {
        username: (new Date()).getTime(),
        passwordDigest: '',
        appId: ''
      };

      Promise.all([
        Currency.findOne(),
        User.create(userData)
      ]).then(([currency]) => {
        chai.request(app)
          .post('/usercurrency')
          .set('x-access-token', jwtSign(userData.username))
          .send({ code: currency.code })
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body.success).to.equal(true);
            done();
          });
      });
    });

    it('responsd with status 422 for nonexistant code', (done) => {
      const userData = {
        username: (new Date()).getTime(),
        passwordDigest: '',
        appId: ''
      };

      Promise.all([
        User.create(userData)
      ]).then(() => {
        chai.request(app)
          .post('/usercurrency')
          .set('x-access-token', jwtSign(userData.username))
          .send({ code: 'BBQ' })
          .end((err, res) => {
            expect(res).to.have.status(422);
            expect(res.body.errors.code).to.equal('is invalid');
            done();
          });
      });
    });

    it('responsd with status 409 for existing association', (done) => {
      const userData = {
        username: (new Date()).getTime(),
        passwordDigest: '',
        appId: ''
      };

      let currencyCode;

      Promise.all([
        Currency.findOne(),
        User.create(userData)
      ]).then(([currency, user]) => {
        currencyCode = currency.code;
        return UserCurrency.create({ userId: user.id, currencyId: currency.id });
      }).then(() => {
        chai.request(app)
          .post('/usercurrency')
          .set('x-access-token', jwtSign(userData.username))
          .send({ code: currencyCode })
          .end((err, res) => {
            expect(res).to.have.status(409);
            expect(res.body.errors.code).to.equal('exists');
            done();
          });
      });
    });
  });

  describe('delete /usercurrency/', () => {
    it('responsd with status 200', (done) => {
      const userData = {
        username: (new Date()).getTime(),
        passwordDigest: '',
        appId: ''
      };

      let currencyCode;

      Promise.all([
        Currency.findOne(),
        User.create(userData)
      ]).then(([currency, user]) => {
        currencyCode = currency.code;
        return UserCurrency.create({ userId: user.id, currencyId: currency.id });
      }).then(() => {
        chai.request(app)
          .delete('/usercurrency')
          .set('x-access-token', jwtSign(userData.username))
          .send({ code: currencyCode })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.success).to.equal(true);
            done();
          });
      });
    });

    it('responsd with status 404', (done) => {
      const userData = {
        username: (new Date()).getTime(),
        passwordDigest: '',
        appId: ''
      };

      Promise.all([
        Currency.findOne(),
        User.create(userData)
      ]).then(() => {
        chai.request(app)
          .delete('/usercurrency')
          .set('x-access-token', jwtSign(userData.username))
          .send({ code: 'WTF' })
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body.errors.code).to.equal('not found');
            done();
          });
      });
    });
  });
});
