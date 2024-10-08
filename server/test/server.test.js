import request from 'supertest';
import { app } from '../server';
import { User } from '../models';

import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../models');

describe('User', () => {
    beforeEach(() => {
        User.findAll.mockResolvedValue([
            { id: 1, email: 'batman@test.com', name: 'batman' },
            { id: 2, email: 'robin@test.com', name: 'robin' }
        ]);

        User.findOne.mockResolvedValue({
            id: 1,
            email: 'batman@test.com',
            name: 'batman',
            apiKey: 'sampleApiKey',
            apiUrl: 'https://api.example.com'
        });

        User.create.mockResolvedValue({
            id: 3,
            email: 'wonderwoman@test.com',
            name: 'wonder woman'
        });

        User.update.mockResolvedValue([1]);
    });

    describe('GET /users', () => {
        it('should return all users', async () => {
            const res = await request(app).get('/users');
            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(2);
            expect(res.body[0].email).toBe('batman@test.com');
        });
    });

    describe('GET /user', () => {
        it('should return a user by email', async () => {
            const res = await request(app)
                .get('/user')
                .query({ email: 'batman@test.com' });

            expect(res.status).toBe(200);
            expect(res.body.email).toBe('batman@test.com');
        });

        it('should return 404 if user is not found', async () => {
            User.findOne.mockResolvedValueOnce(null);

            const res = await request(app)
                .get('/user')
                .query({ email: 'notfound@example.com' });

            expect(res.status).toBe(404);
            expect(res.body.error).toBe('User not found with email: notfound@example.com');
        });
    });

    describe('POST /user', () => {
        it('should create a new user', async () => {
            const newUser = { email: 'wonderwoman@test.com', name: 'wonder woman' };
            const res = await request(app)
                .post('/user')
                .send(newUser);

            expect(res.status).toBe(201);
            expect(res.body.email).toBe('wonderwoman@test.com');
        });

        it('should return 500 if user creation fails', async () => {
            User.create.mockRejectedValueOnce(new Error('Error creating user'));

            const res = await request(app)
                .post('/user')
                .send({ email: 'baduser@example.com' });

            expect(res.status).toBe(500);
            expect(res.body.error).toBe('Failed to create user');
        });
    });

    describe('PUT /api-info', () => {
        it('should update user API info', async () => {
            const res = await request(app)
                .put('/api-info')
                .query({ email: 'batman@test.com' })
                .send({ apiKey: 'newApiKey', apiUrl: 'https://newapi.com' });

            expect(res.status).toBe(200);
        });

        it('should return 404 if user is not found', async () => {
            User.findOne.mockResolvedValueOnce(null);

            const res = await request(app)
                .put('/api-info')
                .query({ email: 'notfound@example.com' })
                .send({ apiKey: 'newApiKey', apiUrl: 'https://newapi.com' });

            expect(res.status).toBe(404);
            expect(res.body.error).toBe('User not found with email: notfound@example.com');
        });
    });
})