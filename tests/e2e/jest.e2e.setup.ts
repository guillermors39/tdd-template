import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { bootstrap } from '../../src';
import nock from 'nock';
import { Server } from 'http';
import { Application } from 'express';
import { promisify } from 'util';

let container: StartedPostgreSqlContainer;
let server: Server;
let app: Application;

beforeAll(async () => {
    container = await new PostgreSqlContainer('postgres:13.3-alpine').withExposedPorts(5432).start();

    app = bootstrap();
    server = app.listen(3001);

    nock.disableNetConnect();
    nock.enableNetConnect((host) => host.includes('localhost') || host.includes('127.0.0.1'));
}, 50000);

afterEach(() => {
    nock.cleanAll();
});

afterAll(async () => {
    try {
        nock.cleanAll();
        nock.restore();

        if (server && server.listening) {
            const closeServer = promisify(server.close.bind(server));
            await closeServer();
        }

        if (container) {
            await container.stop({ timeout: 10000 });
        }
    } catch (error) {
        console.error('Error during cleanup:', error);
    }
}, 60000);

export { app };
