"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaEntity = void 0;
const custom_errors_1 = require("../errors/custom.errors");
class ReservaEntity {
    constructor(id_restaurante, id_usuario, hora, fecha, estado) {
        this.id_restaurante = id_restaurante;
        this.id_usuario = id_usuario;
        this.hora = hora;
        this.fecha = fecha;
        this.estado = estado;
    }
    static fromObject(object) {
        const { id_restaurante, id_usuario, hora, fecha, estado } = object;
        if (!id_restaurante)
            throw custom_errors_1.CustomError.badRequest('Missing id_restaurante email');
        if (!id_usuario)
            throw custom_errors_1.CustomError.badRequest('Missing id_usuario email');
        if (!hora)
            throw custom_errors_1.CustomError.badRequest('Missing hora');
        if (!fecha)
            throw custom_errors_1.CustomError.badRequest('Missing fecha');
        return new ReservaEntity(id_restaurante, id_usuario, hora, fecha, estado);
    }
}
exports.ReservaEntity = ReservaEntity;
ReservaEntity.fromJson = (json) => {
    json = (json === '') ? '{}' : json;
    const { id_restaurante, id_usuario, hora, fecha, estado } = JSON.parse(json);
    const reserva = new ReservaEntity(id_restaurante, id_usuario, hora, fecha, estado);
    return reserva;
};
