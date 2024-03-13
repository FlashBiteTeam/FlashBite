import { Sequelize } from 'sequelize';

interface Options {
    dbName: string;
    username: string;
    password: string;
    host: string;
    port: number;
}

export class MySQLDatabase {
    static async connect(options: Options) {
        const { dbName, username, password, host, port } = options;
        const sequelize = new Sequelize(dbName, username, password, {
            host,
            port,
            dialect: 'mysql',
        });

        try {
            await sequelize.authenticate();
            console.log('MySQL Connected');
            return sequelize;
        } catch (error) {
            console.error('MySQL connection error:', error);
            throw error;
        }
    }
}