import express, { Application } from 'express';
import { AppConfig, container } from './shared/infrastructure/services/ioc';
import { exceptionHandler } from './shared/infrastructure/middlewares/exception.middleware';

export const bootstrap = async (config: AppConfig): Promise<Application> => {
    const app = express();

    await container.bootstrap(config);

    app.use(express.json());

    app.use(exceptionHandler);

    return app;
};
