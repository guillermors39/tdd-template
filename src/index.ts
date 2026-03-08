import express from 'express';

async function main() {
    const app = express();

    const port = process.env.PORT || 3000;

    app.use(express.json());

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

main();
