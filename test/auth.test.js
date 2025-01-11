// Description: Test cases for authentication endpoints
const request = require('supertest');
const app = require('../app');
const { setupDB, teardownDB } = require('./db');
const cheerio = require('cheerio');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);

app.use(
    session({
        secret: 'test-secret',
        resave: false,
        saveUninitialized: true,
        store: new MemoryStore(),
    })
);

jest.setTimeout(30000);

beforeAll(async () => {
    await setupDB(); 
});

afterAll(async () => {
    await teardownDB(); 
});


afterEach(() => {
    app.request.session = null; 
});

describe('Auth Endpoints', () => {
    it('should redirect to dashboard after successful signup', async () => {
        const response = await request(app).post('/auth/signup').send({
            username: 'kasper',
            email: 'kasper@gmail.com',
            password: 'securePassword123',
        });

        expect(response.status).toBe(302);
        expect(response.header.location).toBe('/dashboard');
    });

    it('should return error for duplicate signup', async () => {
        await request(app).post('/auth/signup').send({
            username: 'kasper',
            email: 'kasper@gmail.com',
            password: 'securePassword123',
        });

        const response = await request(app).post('/auth/signup').send({
            username: 'kasper',
            email: 'kasper@gmail.com',
            password: 'securePassword123',
        });

        expect(response.status).toBe(409);
        expect(response.text).toContain('User already exists');
    });

    it('should redirect to dashboard for valid login', async () => {
        await request(app).post('/auth/signup').send({
            username: 'kasper',
            email: 'kasper@gmail.com',
            password: 'securePassword123',
        });

        const response = await request(app).post('/auth/login').send({
            email: 'kasper@gmail.com',
            password: 'securePassword123',
        });

        expect(response.status).toBe(302);
        expect(response.header.location).toBe('/dashboard');
    });

    it('should show error for invalid login', async () => {
        await request(app).post('/auth/signup').send({
            username: 'kasper',
            email: 'kasper@gmail.com',
            password: 'securePassword123',
        });

        const response = await request(app).post('/auth/login').send({
            email: 'kasper@gmail.com',
            password: 'wrongPassword',
        });

        expect(response.status).toBe(401);

        const $ = cheerio.load(response.text);
        expect($('div.alert.error-alert.view-alert p').text()).toContain('Invalid credentials');
    });

    it('should show error for login without signup', async () => {
        const response = await request(app).post('/auth/login').send({
            email: 'nonexistent@gmail.com',
            password: 'doesNotExist123',
        });

        expect(response.status).toBe(401);

        const $ = cheerio.load(response.text);
        expect($('div.alert.error-alert.view-alert p').text()).toContain('Invalid credentials');
    });
});
