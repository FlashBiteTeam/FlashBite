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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_adapter_1 = require("../../config/bcrypt.adapter");
const domain_1 = require("../../domain");
const custom_errors_1 = require("../../domain/errors/custom.errors");
const otp_register_1 = require("../../domain/use-cases/otp/otp-register");
const otp_generate_1 = require("../../domain/use-cases/otp/otp-generate");
const otp_verify_1 = require("../../domain/use-cases/otp/otp-verify");
const register_usuario_1 = require("../../domain/use-cases/auth/register-usuario");
const login_usuario_1 = require("../../domain/use-cases/auth/login-usuario");
const register_restaurante_1 = require("../../domain/use-cases/auth/register-restaurante");
const otp_register_restaurante_1 = require("../../domain/use-cases/otp/otp-register-restaurante");
class AuthService {
    constructor(emailService, otpRepository, userRepository, restauranteRepository) {
        this.emailService = emailService;
        this.otpRepository = otpRepository;
        this.userRepository = userRepository;
        this.restauranteRepository = restauranteRepository;
        this.sendEmailValidationLink = (email, otp, expira) => __awaiter(this, void 0, void 0, function* () {
            const html = `
        <html lang="es">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Valida tu correo electrónico en Flashbite</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    color: #333;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
        
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
        
                .header {
                    background-color: #FF0000;
                    color: #fff;
                    padding: 10px;
                    text-align: center;
                    border-radius: 10px 10px 0 0;
                }
                .main {
                    background-color: #ff6347;
                    color: #fff;
                    padding: 10px;
                    text-align: center;
                }
                h1 {
                    text-align: center;
                }
        
                p {
                    color: #fff;
                }
        
               
            </style>
        </head>
        
        <body>
            <div class="container">
                <div class="header">
                    <h1>¡Bienvenido a Flashbite!</h1>
                </div>
                <div class="main">
                <p>Por favor, valida tu dirección de correo electrónico para completar el registro.</p>
                <p>Tu código de verificación OTP es: <strong>${otp}</strong>.</p>
                <p>Este código expirará en ${expira} horas.</p>
                <p>Por favor, ve a la aplicación e ingresa el código de validación para validar tu correo ${email}</p>
                </div>
            </div>
        </body>
        
        </html>`;
            const options = {
                to: email,
                subject: 'validate your email',
                htmlBody: html,
            };
            const issent = yield this.emailService.sendEmail(options);
            if (!issent)
                throw custom_errors_1.CustomError.internalServer('Error sending email');
            return true;
        });
    }
    registerUser(registerUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield new register_usuario_1.UserRegister(this.userRepository).execute(registerUserDto);
                const _a = user, { contrasena } = _a, newUser = __rest(_a, ["contrasena"]);
                // * generar OTP
                const tiempoExpiracion = 1;
                const newOtp = yield new otp_register_1.OTPRegister(this.otpRepository).execute(registerUserDto, tiempoExpiracion);
                // * Separar codigo 
                const { otp } = newOtp, Otp = __rest(newOtp, ["otp"]);
                // * Enviar correo con otp
                yield this.sendEmailValidationLink(registerUserDto.email, otp, tiempoExpiracion);
                // * Hashear Codigo
                const otpHashed = bcrypt_adapter_1.bcriptAdapter.hash(otp);
                const otpDB = new domain_1.OTPEntity(Object.assign({ otp: otpHashed }, Otp));
                this.otpRepository.saveOTP(otpDB);
                return {
                    user: newUser,
                    message: 'Verifica el codigo otp enviado a tu correo',
                };
            }
            catch (error) {
                throw custom_errors_1.CustomError.internalServer(`${error}`);
            }
        });
    }
    registerRestaurante(registerRestauranteDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield new register_restaurante_1.RestauranteRegister(this.restauranteRepository).execute(registerRestauranteDto);
                const _a = user, { contrasena } = _a, newUser = __rest(_a, ["contrasena"]);
                // * generar OTP
                const tiempoExpiracion = 1;
                const newOtp = yield new otp_register_restaurante_1.OTPRegisterRestaurante(this.otpRepository).execute(registerRestauranteDto, tiempoExpiracion);
                // * Separar codigo 
                const { otp } = newOtp, Otp = __rest(newOtp, ["otp"]);
                // * Enviar correo con otp
                yield this.sendEmailValidationLink(registerRestauranteDto.email, otp, tiempoExpiracion);
                // * Hashear Codigo
                const otpHashed = bcrypt_adapter_1.bcriptAdapter.hash(otp);
                const otpDB = new domain_1.OTPEntity(Object.assign({ otp: otpHashed }, Otp));
                this.otpRepository.saveOTPRestaurante(otpDB);
                return {
                    user: newUser,
                    message: 'Verifica el codigo otp enviado a tu correo',
                };
            }
            catch (error) {
                throw custom_errors_1.CustomError.internalServer(`${error}`);
            }
        });
    }
    verifyOTP(verifyOTPDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const found = yield new otp_verify_1.OTPVerify(this.otpRepository).execute(verifyOTPDto);
                console.log('found = ', found);
                if (found) {
                    this.userRepository.validateEmail(verifyOTPDto);
                    this.restauranteRepository.validateEmail(verifyOTPDto);
                    return {
                        message: 'Codigo valido, bienvenido',
                    };
                }
                else {
                    throw custom_errors_1.CustomError.badRequest(`Codigo no valido`);
                }
            }
            catch (error) {
                throw custom_errors_1.CustomError.internalServer(`${error}`);
            }
        });
    }
    loginUser(loginUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const loginResponse = yield new login_usuario_1.UserLogin(this.userRepository, this.restauranteRepository).execute(loginUserDto);
            return loginResponse;
        });
    }
    OTPGenerate(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // * generar OTP
                const tiempoExpiracion = 1;
                const newOtp = yield new otp_generate_1.OTPgenerate(this.otpRepository).execute(email, tiempoExpiracion);
                // * Enviar correo con otp
                yield this.sendEmailValidationLink(email, newOtp.otp, tiempoExpiracion);
                // * Hashear Codigo
                const otpHashed = bcrypt_adapter_1.bcriptAdapter.hash(newOtp.otp);
                const { otp } = newOtp, Otp = __rest(newOtp, ["otp"]);
                const otpDB = new domain_1.OTPEntity(Object.assign({ otp: otpHashed }, Otp));
                this.otpRepository.saveOTP(otpDB);
                return {
                    message: 'Verifica el codigo otp enviado a tu correo',
                };
            }
            catch (error) {
                throw custom_errors_1.CustomError.internalServer(`${error}`);
            }
        });
    }
}
exports.AuthService = AuthService;
