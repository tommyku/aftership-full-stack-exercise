/* eslint-env mocha */
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const { app } = require('../test_helper');
const clientConfig = require('../../config/client.js');

chai.use(chaiHttp);

describe('Home', () => {
  describe('/', () => {
    it('responds with status 301', function(done) {
      chai.request(app)
        .get('/')
        .redirects(0)
        .end((err, res) => {
          expect(res).to.have.status(301);
          expect(res).to.redirectTo(clientConfig.clientURL);
          done();
        });
    });
  });
});
