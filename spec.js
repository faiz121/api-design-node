var app = require('./server');
var request = require('supertest');
var chaiexpect = require('chai').expect;

describe('[LIONS]', function() {
  it('should get all lions', function(done) {
    request(app)
        .get('/lions')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, resp) {
          chaiexpect(resp.body).to.be.an('array');
          done();
        })
  });
  it('should get one lion', function(done) {
    request(app)
        .get('/lions/:id')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, resp) {
          chaiexpect(resp.body).to.be.an('object');
          done();
        })
  });
});