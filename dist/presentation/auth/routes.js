"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
const mongo_otp_datasource_1 = require("../../infrastructure/datasources/mongo-otp.datasource");
const mysql_user_datasource_1 = require("../../infrastructure/datasources/mysql-user.datasource");
const otp_repository_impl_1 = require("../../infrastructure/repositories/otp.repository.impl");
const user_repository_impl_1 = require("../../infrastructure/repositories/user.repository.impl");
const auth_service_1 = require("../services/auth.service");
const email_service_1 = require("../services/email.service");
const envs_1 = require("../../config/envs");
const mysql_restaurante_datasource_1 = require("../../infrastructure/datasources/mysql-restaurante.datasource");
const restaurante_repository_impl_1 = require("../../infrastructure/repositories/restaurante.repository.impl");
class AuthRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        // * OTP
        const mongodatasource = new mongo_otp_datasource_1.MongoOTPDatasource();
        const mongoRepository = new otp_repository_impl_1.OTPRepositoryImpl(mongodatasource);
        // * Registro usuarios
        const mysqldatasource = new mysql_user_datasource_1.MysqlUserDatasource();
        const mysqlyRepository = new user_repository_impl_1.UserRepositoryImpl(mysqldatasource);
        // * Registro restaurantes
        const mysqlRestauranteDatasource = new mysql_restaurante_datasource_1.MysqlRestauranteDatasource();
        const mysqlRestauranteRepository = new restaurante_repository_impl_1.RestauranteRepositoryImpl(mysqlRestauranteDatasource);
        // * Envio correos
        const emailService = new email_service_1.EmailService(envs_1.envs.MAILER_SERVICE, envs_1.envs.MAILER_EMAIL, envs_1.envs.MAILER_SECRET_KEY);
        const authService = new auth_service_1.AuthService(emailService, mongoRepository, mysqlyRepository, mysqlRestauranteRepository);
        const controller = new controller_1.AuthController(authService);
        // * RUTAS
        router.post('/register/user', controller.registerUser);
        router.post('/register/restaurante', controller.registerRestaurante);
        router.post('/generate/otp', controller.generateOTP);
        router.post('/login', controller.login);
        router.post('/verify', controller.verifyUser);
        return router;
    }
}
exports.AuthRoutes = AuthRoutes;
