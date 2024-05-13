"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrearReservaDto = void 0;
const config_1 = require("../../../config");
class CrearReservaDto {
    constructor(restaurante, usuario, hora, fecha) {
        this.restaurante = restaurante;
        this.usuario = usuario;
        this.hora = hora;
        this.fecha = fecha;
    }
    static create(object) {
        const { restaurante, usuario, hora, fecha } = object;
        if (!restaurante)
            return ['Missing Restaurante email addres', undefined];
        if (!usuario)
            return ['Missing Usuario Email', undefined];
        if (!config_1.regularExps.email.test(restaurante))
            return ['Restaurante Email is not vaild', undefined];
        if (!config_1.regularExps.email.test(usuario))
            return ['Usuario Email is not vaild', undefined];
        if (!hora)
            return ['Missing hour', undefined];
        if (!fecha)
            return ['Missing Fecha', undefined];
        return [undefined, new CrearReservaDto(restaurante, usuario, hora, fecha)];
    }
}
exports.CrearReservaDto = CrearReservaDto;
