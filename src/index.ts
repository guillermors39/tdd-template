import { bootstrap } from './bootstrap';

async function main() {
    const app = await bootstrap({
        database: {
            host: process.env.MYSQL_HOST!,
            port: +process.env.MYSQL_PORT! || 3306,
            username: process.env.MYSQl_USERNAME!,
            password: process.env.MYSQL_PASSWORD!,
            db: process.env.MYSQL_DB_NAME!,
        },
    });

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

main();
