// import { createConnection } from 'mysql2/promise';

export interface Type<T = any> extends Function {
    new (...args: any[]): T;
}

export type KeyToken = string | symbol | Type;

export type AppConfig = {
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        db: string;
    };
};

export const DB_CONNECTION = Symbol('DatabaseConnection');

class Container {
    private instances: Map<string | symbol, any> = new Map();

    private static instance: Container;

    private constructor() {}

    public register<T>(key: Type<T>, value: T): void;
    public register(key: string | symbol, value: unknown): void;
    public register(key: KeyToken, value: unknown): void {
        if (typeof key === 'string' || typeof key === 'symbol') {
            this.instances.set(key, value);
        } else {
            this.register(key.name, value);
        }
    }

    public resolve<T>(key: Type<T>): T;
    public resolve<T>(key: string | symbol): T;
    public resolve<T>(key: KeyToken): T {
        if (typeof key === 'string' || typeof key === 'symbol') {
            return this.instances.get(key) as T;
        }

        return this.resolve(key.name);
    }

    public clear(): void {
        this.instances.clear();
    }

    public async bootstrap({ database }: AppConfig): Promise<void> {
        // const connection = await createConnection({
        //     host: database.host,
        //     user: database.username,
        //     password: database.password,
        //     port: database.port,
        //     database: database.db,
        // });
        // this.register(DB_CONNECTION, connection);
    }

    public static getInstance(): Container {
        if (!this.instance) {
            this.instance = new Container();
        }
        return this.instance;
    }
}

export const container = Container.getInstance();
