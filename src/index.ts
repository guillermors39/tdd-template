import { bootstrap } from './bootstrap';

async function main() {
    const app = bootstrap();

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

main();
