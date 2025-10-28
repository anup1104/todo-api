const request = require('supertest');
const app = require('../src/server');

describe('GET /', () => {
  it('responds with json message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Hello from simple-ci-cd-demo!');
  });
});
