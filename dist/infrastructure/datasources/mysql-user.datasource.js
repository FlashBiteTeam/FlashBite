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
exports.MysqlUserDatasource = void 0;
const domain_1 = require("../../domain");
const usuarios_model_1 = require("../../data/mysql/models/usuarios.model");
class MysqlUserDatasource {
    findOne(email, emailValidado) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield usuarios_model_1.Usuario.findOne({ where: { email: email, emailValidado: emailValidado } });
            if (usuario)
                return domain_1.UsuarioEntity.fromObject(usuario);
            return null;
        });
    }
    createUser(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(dto, 'CREATE USER');
            const usuarioModel = {
                email: dto.email,
                nombre: dto.nombre,
                contrasena: dto.contrasena,
                numero: dto.numero,
            };
            const user = yield usuarios_model_1.Usuario.create(usuarioModel);
            return domain_1.UsuarioEntity.fromObject(user);
        });
    }
    validateEmail(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = dto;
            const user = yield usuarios_model_1.Usuario.update({ emailValidado: true }, {
                where: { email },
                returning: true
            });
            if (user) {
                console.log(`Email validado para el usuario con email ${email}.`);
                return true;
            }
            else {
                console.log(`No se pudo validar el email para el usuario con email ${email}.`);
                return false;
            }
        });
    }
}
exports.MysqlUserDatasource = MysqlUserDatasource;
