"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = exports.db = void 0;
const sequelize_1 = require("sequelize");
const envs_1 = require("../../config/envs");
exports.db = new sequelize_1.Sequelize(envs_1.envs.MYSQL_DB, envs_1.envs.MYSQL_USERNAME, envs_1.envs.MYSQL_ROOT_PASSWORD, {
    host: envs_1.envs.MYSQL_HOST,
    port: 3306,
    dialect: 'mysql',
});
const dbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.db.authenticate();
        yield exports.db.sync({ alter: true });
        console.log('Database online');
    }
    catch (error) {
        throw error;
    }
});
exports.dbConnection = dbConnection;
