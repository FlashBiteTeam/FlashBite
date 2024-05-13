"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistorialEntity = void 0;
const custom_errors_1 = require("../errors/custom.errors");
class HistorialEntity {
    constructor(id_restaurante, id_usuario, comentario, calificacion, hora, fecha, estado) {
        this.id_restaurante = id_restaurante;
        this.id_usuario = id_usuario;
        this.comentario = comentario;
        this.calificacion = calificacion;
        this.hora = hora;
        this.fecha = fecha;
        this.estado = estado;
    }
    static fromObject(object) {
        const { id_restaurante, id_usuario, comentario, calificacion, hora, fecha, estado } = object;
        if (!id_restaurante)
            throw custom_errors_1.CustomError.badRequest('Missing id_restaurante');
        if (!id_usuario)
            throw custom_errors_1.CustomError.badRequest('Missing id_usuario');
        if (!hora)
            throw custom_errors_1.CustomError.badRequest('Missing hora');
        if (!fecha)
            throw custom_errors_1.CustomError.badRequest('Missing fecha');
        return new HistorialEntity(id_restaurante, id_usuario, comentario, calificacion, hora, fecha, estado);
    }
    static fromJson(json) {
        json = (json === '') ? '{}' : json;
        const { id_restaurante, id_usuario, comentario, calificacion, hora, fecha, estado } = JSON.parse(json);
        if (!id_restaurante)
            throw custom_errors_1.CustomError.badRequest('Missing id_restaurante');
        if (!id_usuario)
            throw custom_errors_1.CustomError.badRequest('Missing id_usuario');
        if (!hora)
            throw custom_errors_1.CustomError.badRequest('Missing hora');
        if (!fecha)
            throw custom_errors_1.CustomError.badRequest('Missing fecha');
        return new HistorialEntity(id_restaurante, id_usuario, comentario, calificacion, hora, fecha, estado);
    }
}
exports.HistorialEntity = HistorialEntity;
