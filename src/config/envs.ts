import {get} from 'env-var';
import 'dotenv/config';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    MYSQL_DB: get('MYSQL_DB').required().asString(),
    MYSQL_ROOT_PASSWORD: get('MYSQL_ROOT_PASSWORD').required().asString(),
    MYSQL_PORT: get('MYSQL_PORT').required().asPortNumber(),
    MYSQL_USERNAME: get('MYSQL_USERNAME').required().asString(),
    MYSQL_HOST: get('MYSQL_HOST').required().asString(),
    MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
    MONGO_URL: get('MONGO_URL').required().asString(),
    MAILER_SERVICE:get('MAILER_SERVICE').required().asString(),
    MAILER_EMAIL:get('MAILER_EMAIL').required().asString(),
    MAILER_SECRET_KEY:get('MAILER_SECRET_KEY').required().asString(),
    JWT_SEED: get('JWT_SEED').required().asString(),

}
