"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResenaDto = void 0;
const config_1 = require("../../../config");
class ResenaDto {
    constructor(emailUsuario, emailRestaurante, comentario, calificacion, hora, fecha) {
        this.emailUsuario = emailUsuario;
        this.emailRestaurante = emailRestaurante;
        this.comentario = comentario;
        this.calificacion = calificacion;
        this.hora = hora;
        this.fecha = fecha;
    }
    static create(object) {
        const { emailUsuario, emailRestaurante, comentario, calificacion, hora, fecha } = object;
        if (!emailRestaurante)
            return ['Restaurant email is missing', undefined];
        if (!config_1.regularExps.email.test(emailRestaurante))
            return ['Restaurant email is not vaild', undefined];
        if (!emailUsuario)
            return ['User email is missing', undefined];
        if (!config_1.regularExps.email.test(emailUsuario))
            return ['User email is not vaild', undefined];
        if (!comentario)
            return ['Comentario can not be null', undefined];
        if (!calificacion)
            return ['calificacion can not be null', undefined];
        if (!hora)
            return ['hora can not be null', undefined];
        if (!fecha)
            return ['fecha can not be null', undefined];
        return [undefined, new ResenaDto(emailUsuario, emailRestaurante, comentario, calificacion, hora, fecha)];
    }
}
exports.ResenaDto = ResenaDto;
