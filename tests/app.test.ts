import { Server } from '../src/presentation/server';
import { AppRoutes } from "../src/presentation/routes";
import { Router } from 'express';
import { dbConnection } from "../src/data/mysql/mysql-database";
import { envs } from '../src/config/envs';

const mockRouter = Router();

describe('Test app.ts', () => {
    test('Should work', () => {
        expect(true).toBeTruthy();
    });

    test('Server should start', async () => {
        const serverExpress = new Server({
            port: envs.PORT, 
            routes: mockRouter
        });

       
        const listenSpy = jest.spyOn(serverExpress.app, 'listen');

        await serverExpress.start();

        expect(listenSpy).toHaveBeenCalled();

        listenSpy.mockRestore();
    });

    test('Database connection should be established', async () => {
        await dbConnection();

    });
    afterAll(async () => {
        
    });
});