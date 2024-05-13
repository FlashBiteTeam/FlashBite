"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const domain_1 = require("../../domain");
const custom_errors_1 = require("../../domain/errors/custom.errors");
const verify_otp_dtp_t_1 = require("../../domain/dtos/auth/verify-otp.dtp.t");
const login_user_dto_1 = require("../../domain/dtos/auth/login-user.dto");
const register_restaurante_1 = require("../../domain/dtos/auth/register-restaurante");
class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.handleError = (error, res) => {
            if (error instanceof custom_errors_1.CustomError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Internal server error' });
        };
        this.registerUser = (req, res) => {
            const [error, registerDto] = domain_1.RegisterUserDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            if (registerDto) {
                this.authService.registerUser(registerDto)
                    .then((user) => res.json(user))
                    .catch(error => this.handleError(error, res));
            }
        };
        this.registerRestaurante = (req, res) => {
            const [error, registerRestauranteDto] = register_restaurante_1.RegisterRestauranteDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            if (registerRestauranteDto) {
                this.authService.registerRestaurante(registerRestauranteDto)
                    .then((user) => res.json(user))
                    .catch(error => this.handleError(error, res));
            }
        };
        this.verifyUser = (req, res) => {
            const [error, verifyOTPDto] = verify_otp_dtp_t_1.VerifyOTPDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            if (verifyOTPDto) {
                this.authService.verifyOTP(verifyOTPDto)
                    .then((message) => res.json({ message }).status(200))
                    .catch(error => this.handleError(error, res));
            }
        };
        this.login = (req, res) => {
            const [error, loginUserDto] = login_user_dto_1.LoginUserDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            if (loginUserDto) {
                this.authService.loginUser(loginUserDto)
                    .then((message) => res.json({ message }).status(200))
                    .catch(error => this.handleError(error, res));
            }
        };
        this.generateOTP = (req, res) => {
            const { email } = req.body;
            if (!email)
                return res.status(400).json({ error: 'Argumento invalido' });
            if (email) {
                this.authService.OTPGenerate(email)
                    .then((message) => res.json({ message }).status(200))
                    .catch(error => this.handleError(error, res));
            }
        };
    }
    ;
}
exports.AuthController = AuthController;
