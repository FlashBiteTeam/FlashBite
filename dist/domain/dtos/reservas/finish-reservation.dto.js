"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinishReservationDto = void 0;
const config_1 = require("../../../config");
class FinishReservationDto {
    constructor(emailUsuario, emailRestaurante) {
        this.emailUsuario = emailUsuario;
        this.emailRestaurante = emailRestaurante;
    }
    static create(object) {
        const { emailUsuario, emailRestaurante } = object;
        console.log(emailRestaurante);
        if (!emailRestaurante)
            return ['Restaurant email is missing', undefined];
        if (!config_1.regularExps.email.test(emailRestaurante))
            return ['Restaurant email is not vaild', undefined];
        if (!emailUsuario)
            return ['User email is missing', undefined];
        if (!config_1.regularExps.email.test(emailUsuario))
            return ['User email is not vaild', undefined];
        return [undefined, new FinishReservationDto(emailUsuario, emailRestaurante)];
    }
}
exports.FinishReservationDto = FinishReservationDto;
