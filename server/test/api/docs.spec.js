import supertest from 'supertest';
import { assert } from 'chai';
import app from '../../server';
import '../../models/index';
import helper from '../helpers/helper';

const server = supertest.agent(app);
let jwtToken;


describe('Document suite', () => {
  before((done) => {
    server
      .post('/users/')
      .send(helper.adminInfo)
      .end((err, res) => {
        jwtToken = res.body.token;
        done();
      });
  });
  it('Should return all documents if user is an admin', (done) => {
    server
      .get('/documents/')
      .expect(200)
      .set('X-ACCESS-TOKEN', jwtToken)
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });
  it('Should return document when searched by the document id', (done) => {
    server
      .get('/documents/5')
      .expect(200)
      .set('X-ACCESS-TOKEN', jwtToken)
      .end((err, res) => {
        assert.equal(res.status, 200);
        done();
      });
  });
  it('Should be able to edit document', (done) => {
    server
      .put('/documents/6')
      .expect(200)
      .set('X-ACCESS-TOKEN', jwtToken)
      .send({ title: 'Notes for the day' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.message, 'Update successful');
        done();
      });
  });
  it('Should be able to create a document', (done) => {
    server
      .post('/documents')
      .set('X-ACCESS-TOKEN', jwtToken)
      .send(helper.newDoc)
      .end((err, res) => {
        assert.equal(res.status, 201);
        done();
      });
  });
});
describe('Documents', () => {
  before((done) => {
    server
      .post('/users/')
      .send(helper.usersInfo)
      .end((err, res) => {
        jwtToken = res.body.token;

        server
          .post('/users/login')
          .send({ email: 'rere@gmail.com', password: 'password' })
          .end((err, res) => {
            jwtToken = res.body.token;
            done();
          });
      });
  });
  it('Should not return all documents if user is not an admin', (done) => {
    server
        .get('/documents/')
        .expect(403)
        .set('x-access-token', jwtToken)
        .end((err, res) => {
          assert.equal(res.status, 403);
          done();
        });
  });
});