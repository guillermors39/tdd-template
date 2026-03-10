import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { bootstrap } from '../../src/bootstrap';
import nock from 'nock';
import { Server } from 'http';
import { Application } from 'express';

let container: StartedPostgreSqlContainer;
let server: Server;
let app: Application;

beforeAll(async () => {
    container = await new PostgreSqlContainer('postgres:13.3-alpine').withExposedPorts(5432).start();

    app = bootstrap();
    server = app.listen(3001);

    nock.disableNetConnect();
    nock.enableNetConnect();
}, 50000);

afterEach(() => {
    nock.cleanAll();
});

afterAll(async () => {
    nock.cleanAll();
    nock.restore();
    server.close();
    await container.stop();
}, 60000);

export { app };
