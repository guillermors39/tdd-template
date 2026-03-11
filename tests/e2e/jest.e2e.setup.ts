import { bootstrap } from '../../src/bootstrap';
import nock from 'nock';
import { Server } from 'http';
import { Application } from 'express';

let server: Server;
let app: Application;

beforeAll(async () => {
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
}, 60000);

export { app };
