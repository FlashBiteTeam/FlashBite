"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioEntity = void 0;
const custom_errors_1 = require("../errors/custom.errors");
class UsuarioEntity {
    constructor(nombre, email, emailValidado, contrasena, numero, role) {
        this.nombre = nombre;
        this.email = email;
        this.emailValidado = emailValidado;
        this.contrasena = contrasena;
        this.numero = numero;
        this.role = role;
    }
    static fromObject(object) {
        const { nombre, email, emailValidado, contrasena, numero, role } = object;
        if (!nombre)
            throw custom_errors_1.CustomError.badRequest('Missing name');
        if (!email)
            throw custom_errors_1.CustomError.badRequest('Missing email');
        if (emailValidado === undefined)
            throw custom_errors_1.CustomError.badRequest('Missing emailValidated');
        if (!contrasena)
            throw custom_errors_1.CustomError.badRequest('Missing password');
        if (!numero)
            throw custom_errors_1.CustomError.badRequest('Missing numero');
        return new UsuarioEntity(nombre, email, emailValidado, contrasena, numero, role);
    }
}
exports.UsuarioEntity = UsuarioEntity;
UsuarioEntity.fromJson = (json) => {
    json = (json === '') ? '{}' : json;
    const { nombre, email, emailValidado, contrasena, numero, role } = JSON.parse(json);
    const usuario = new UsuarioEntity(nombre, email, emailValidado, contrasena, numero, role);
    return usuario;
};
