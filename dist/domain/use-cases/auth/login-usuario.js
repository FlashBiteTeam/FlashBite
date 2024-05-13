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
exports.UserLogin = void 0;
const bcrypt_adapter_1 = require("../../../config/bcrypt.adapter");
const jwt_adapter_1 = require("../../../config/jwt.adapter");
const restaurante_entity_1 = require("../../entities/restaurante.entity");
const usuario_entity_1 = require("../../entities/usuario.entity");
const custom_errors_1 = require("../../errors/custom.errors");
class UserLogin {
    constructor(userRepository, restauranteRepository) {
        this.userRepository = userRepository;
        this.restauranteRepository = restauranteRepository;
    }
    execute(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const existUser = yield this.userRepository.findOne(dto.email, true);
            const existRestaurante = yield this.restauranteRepository.findOne(dto.email, true);
            if (!existUser && !existRestaurante)
                throw custom_errors_1.CustomError.badRequest('This email is not registered or authenticated');
            //Todo buscar restaurante tambien
            if (existUser) {
                const isMatching = bcrypt_adapter_1.bcriptAdapter.compare(dto.contrasena, existUser.contrasena);
                if (!isMatching)
                    throw custom_errors_1.CustomError.badRequest('Password is not valid');
                const _a = usuario_entity_1.UsuarioEntity.fromObject(existUser), { contrasena } = _a, userEntity = __rest(_a, ["contrasena"]);
                const token = yield jwt_adapter_1.JwtAdapter.generateToken({ email: userEntity.email });
                if (!token)
                    throw custom_errors_1.CustomError.internalServer('Error while creating JWT');
                return {
                    user: userEntity,
                    token: token,
                    tipo: 'usuario'
                };
            }
            if (existRestaurante) {
                const isMatching = bcrypt_adapter_1.bcriptAdapter.compare(dto.contrasena, existRestaurante.contrasena);
                if (!isMatching)
                    throw custom_errors_1.CustomError.badRequest('Password is not valid');
                const _b = restaurante_entity_1.RestauranteEntity.fromObject(existRestaurante), { contrasena } = _b, restauranteEntity = __rest(_b, ["contrasena"]);
                const token = yield jwt_adapter_1.JwtAdapter.generateToken({ email: restauranteEntity.email });
                if (!token)
                    throw custom_errors_1.CustomError.internalServer('Error while creating JWT');
                return {
                    user: restauranteEntity,
                    token: token,
                    tipo: 'restaurante'
                };
            }
            else {
                throw custom_errors_1.CustomError.internalServer('Unexpected error occurred');
            }
        });
    }
}
exports.UserLogin = UserLogin;
