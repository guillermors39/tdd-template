import express, { Application } from 'express';

export const bootstrap = (): Application => {
    const app = express();

    app.use(express.json());

    return app;
};

async function main() {
    const app = bootstrap();

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

main();
