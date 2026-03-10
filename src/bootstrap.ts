import express, { Application } from 'express';

export const bootstrap = (): Application => {
    const app = express();

    app.use(express.json());

    return app;
};
