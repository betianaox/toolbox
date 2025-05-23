const app = require('../../api');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

describe('API /files endpoints', () => {

  describe('GET /files/list', () => {
    it('should return a list of files', (done) => {
      chai.request(app)
        .get('/files/list')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('files').that.is.an('array');
          done();
        });
    });
  });

  describe('GET /files/data', () => {
    it('should return parsed file data as an array', (done) => {
      chai.request(app)
        .get('/files/data')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

});