const request = require('supertest');
const app = require('../dist/server').default;

const host = 'localhost';
const port = 3000;

describe('Config server', () => {
    afterAll(done => {
        app.close();
        done();
    });

    it('should return 200', async done => {
        const res = await request(`${host}:${port}`).get('/health');
        expect(res.status).toEqual(200);
        done();
    });
});
