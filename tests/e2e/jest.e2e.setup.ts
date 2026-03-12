import { bootstrap } from '../../src/bootstrap';
import nock from 'nock';
import { Server } from 'http';
import { Application } from 'express';
import { StartedMySqlContainer, MySqlContainer } from '@testcontainers/mysql';

let server: Server;
let app: Application;
let mysql: StartedMySqlContainer;

beforeAll(async () => {
    mysql = await new MySqlContainer('mysql:8').withDatabase('test').withExposedPorts(3306).start();

    app = await bootstrap({
        database: {
            db: mysql.getDatabase(),
            host: mysql.getHost(),
            port: mysql.getPort(),
            username: 'root',
            password: mysql.getRootPassword(),
        },
    });

    server = app.listen(3001);

    nock.disableNetConnect();
    nock.enableNetConnect();
}, 50000);

afterEach(() => {
    nock.cleanAll();
});

afterAll(async () => {
    if (mysql instanceof StartedMySqlContainer) {
        await mysql.stop();
    }

    nock.cleanAll();
    nock.restore();
    server.close();
}, 60000);

export { app };
