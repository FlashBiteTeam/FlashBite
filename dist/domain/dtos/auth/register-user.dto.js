"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserDto = void 0;
const config_1 = require("../../../config/");
class RegisterUserDto {
    constructor(nombre, email, contrasena, numero) {
        this.nombre = nombre;
        this.email = email;
        this.contrasena = contrasena;
        this.numero = numero;
    }
    static create(object) {
        const { nombre, email, contrasena, numero } = object;
        if (!nombre)
            return ['Missing nombre', undefined];
        if (!email)
            return ['Missing email', undefined];
        if (!numero)
            return ['Missing numero', undefined];
        if (numero < 10)
            return ['Not a valid number', undefined];
        if (!config_1.regularExps.email.test(email))
            return ['Email is not vaild', undefined];
        if (!contrasena)
            return ['Missing contraseña', undefined];
        if (contrasena.length < 6)
            return ['contraseña too short', undefined];
        return [undefined, new RegisterUserDto(nombre, email, contrasena, numero)];
    }
}
exports.RegisterUserDto = RegisterUserDto;
