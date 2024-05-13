"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRestauranteDto = void 0;
const config_1 = require("../../../config");
class RegisterRestauranteDto {
    constructor(nombre, direccion, email, nit, contrasena, numero, tipoComida) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.email = email;
        this.nit = nit;
        this.contrasena = contrasena;
        this.numero = numero;
        this.tipoComida = tipoComida;
    }
    static create(object) {
        const { nombre, direccion, email, nit, contrasena, numero, tipoComida } = object;
        if (!nombre)
            return ['Missing name', undefined];
        if (!direccion)
            return ['Missing direccion', undefined];
        if (!email)
            return ['Missing email', undefined];
        if (!nit)
            return ['Missing nit', undefined];
        if (!config_1.regularExps.email.test(email))
            return ['Email is not vaild', undefined];
        if (!contrasena)
            return ['Missing password', undefined];
        if (contrasena.length < 6)
            return ['Password too short', undefined];
        if (!numero)
            return ['Missing numero de telefono', undefined];
        return [undefined, new RegisterRestauranteDto(nombre, direccion, email, nit, contrasena, numero, tipoComida)];
    }
}
exports.RegisterRestauranteDto = RegisterRestauranteDto;
