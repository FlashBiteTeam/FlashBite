"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestauranteEntity = void 0;
const custom_errors_1 = require("../errors/custom.errors");
class RestauranteEntity {
    constructor(nombre, email, emailValidado, contrasena, numero, direccion, nit, tipoComida) {
        this.nombre = nombre;
        this.email = email;
        this.emailValidado = emailValidado;
        this.contrasena = contrasena;
        this.numero = numero;
        this.direccion = direccion;
        this.nit = nit;
        this.tipoComida = tipoComida;
    }
    static fromObject(object) {
        const { nombre, email, emailValidado, contrasena, numero, direccion, nit, tipoComida } = object;
        if (!nombre)
            throw custom_errors_1.CustomError.badRequest('Missing name');
        if (!email)
            throw custom_errors_1.CustomError.badRequest('Missing email');
        if (!numero)
            throw custom_errors_1.CustomError.badRequest('Missing numero');
        if (!direccion)
            throw custom_errors_1.CustomError.badRequest('Missing direccion');
        if (!contrasena)
            throw custom_errors_1.CustomError.badRequest('Missing password');
        if (!direccion)
            throw custom_errors_1.CustomError.badRequest('Missing password');
        return new RestauranteEntity(nombre, email, emailValidado, contrasena, numero, direccion, nit, tipoComida);
    }
}
exports.RestauranteEntity = RestauranteEntity;
RestauranteEntity.fromJson = (json) => {
    json = (json === '') ? '{}' : json;
    const { nombre, email, emailValidado, contrasena, numero, direccion, nit, tipoComida } = JSON.parse(json);
    const usuario = new RestauranteEntity(nombre, email, emailValidado, contrasena, numero, direccion, nit, tipoComida);
    return usuario;
};
