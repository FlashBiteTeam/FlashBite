"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
const env_var_1 = require("env-var");
require("dotenv/config");
exports.envs = {
    PORT: (0, env_var_1.get)('PORT').required().asPortNumber(),
    MYSQL_DB: (0, env_var_1.get)('MYSQL_DB').required().asString(),
    MYSQL_ROOT_PASSWORD: (0, env_var_1.get)('MYSQL_ROOT_PASSWORD').required().asString(),
    MYSQL_PORT: (0, env_var_1.get)('MYSQL_PORT').required().asPortNumber(),
    MYSQL_USERNAME: (0, env_var_1.get)('MYSQL_USERNAME').required().asString(),
    MYSQL_HOST: (0, env_var_1.get)('MYSQL_HOST').required().asString(),
    MAILER_SERVICE: (0, env_var_1.get)('MAILER_SERVICE').required().asString(),
    MAILER_EMAIL: (0, env_var_1.get)('MAILER_EMAIL').required().asString(),
    MAILER_SECRET_KEY: (0, env_var_1.get)('MAILER_SECRET_KEY').required().asString(),
    JWT_SEED: (0, env_var_1.get)('JWT_SEED').required().asString(),
    AZURE_STORAGE_CONNECTION_STRING: (0, env_var_1.get)('AZURE_STORAGE_CONNECTION_STRING').required().asString(),
};
