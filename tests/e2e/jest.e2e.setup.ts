import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { bootstrap } from '../../src';
import nock from 'nock';
import { Server } from 'http';
import { Application } from 'express';

let container: StartedPostgreSqlContainer;
let server: Server;
let app: Application;

beforeAll(async () => {
    container = await new PostgreSqlContainer('postgres:13.3-alpine').start();
    app = bootstrap();
    server = app.listen(3001);
    nock.disableNetConnect();
    nock.enableNetConnect();
}, 50000);

afterEach(() => {
    nock.cleanAll();
});

afterAll(async () => {
    await container.stop();
    server.close();
    nock.enableNetConnect();
}, 50000);

export { app };
