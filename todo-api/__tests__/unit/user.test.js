const app = require('../../src/server');
const { userMock } = require('../mocks');

const supertest = require('supertest')
const request = supertest(app);

describe('Testing register and log in user.', () => {
    
    it("Should create an register successfuly", async () => {
        const response = await request.post('/api/user').send(userMock);
        expect(response.body.message).toBe('User created successfully!');
    });

    it("Should receive a conflict", async () => {
        const response = await request.post('/api/user').send(userMock);
        expect(response.status).toBe(422);
        expect(response.body).toBe('User already exists!');
    });

    it("Should make a log in and receive a token", async () => {
        const response = await request.post('/api/auth').send({ email:userMock.email, password:userMock.password });
        expect(response.status).toBe(202);
        expect(response.body.token).toBeDefined();
    });
});