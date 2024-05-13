"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserDto = void 0;
class LoginUserDto {
    constructor(email, contrasena) {
        this.email = email;
        this.contrasena = contrasena;
    }
    static create(object) {
        const { email, contrasena } = object;
        if (!email)
            return ['Missing email', undefined];
        if (!contrasena)
            return ['Missing password', undefined];
        return [undefined, new LoginUserDto(email, contrasena)];
    }
}
exports.LoginUserDto = LoginUserDto;
