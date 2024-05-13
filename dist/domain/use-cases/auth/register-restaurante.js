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
exports.RestauranteRegister = void 0;
const bcrypt_adapter_1 = require("../../../config/bcrypt.adapter");
const custom_errors_1 = require("../../errors/custom.errors");
class RestauranteRegister {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const existUser = yield this.repository.findOne(dto.email, true);
            console.log(existUser);
            if (existUser)
                throw custom_errors_1.CustomError.badRequest('El email ya esta registrado');
            try {
                const usuarioRegistrado = yield this.repository.findOne(dto.email, false);
                if (usuarioRegistrado) {
                    return usuarioRegistrado;
                }
                const { contrasena } = dto, RegisterRestauranteDto = __rest(dto, ["contrasena"]);
                const contrasenaHasheada = bcrypt_adapter_1.bcriptAdapter.hash(contrasena);
                //* hash password
                const user = yield this.repository.createRestaurante(Object.assign(Object.assign({}, RegisterRestauranteDto), { contrasena: contrasenaHasheada }));
                return user;
            }
            catch (error) {
                throw custom_errors_1.CustomError.internalServer(`${error}`);
            }
        });
    }
}
exports.RestauranteRegister = RestauranteRegister;
