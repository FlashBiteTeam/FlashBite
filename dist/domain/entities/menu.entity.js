"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuEntity = void 0;
const custom_errors_1 = require("../errors/custom.errors");
class MenuEntity {
    constructor(id_restaurante, tipo, nombre_plato, precio, descripcion) {
        this.id_restaurante = id_restaurante;
        this.tipo = tipo;
        this.nombre_plato = nombre_plato;
        this.precio = precio;
        this.descripcion = descripcion;
    }
    static fromObject(object) {
        const { id_restaurante, tipo, nombre_plato, precio, descripcion } = object;
        if (!id_restaurante)
            throw custom_errors_1.CustomError.badRequest('Missing id_restaurante');
        if (!tipo)
            throw custom_errors_1.CustomError.badRequest('Missing tipo');
        if (!nombre_plato)
            throw custom_errors_1.CustomError.badRequest('Missing nombre_plato');
        if (!precio)
            throw custom_errors_1.CustomError.badRequest('Missing precio');
        if (!descripcion)
            throw custom_errors_1.CustomError.badRequest('Missing descripcion');
        return new MenuEntity(id_restaurante, tipo, nombre_plato, precio, descripcion);
    }
    static fromJson(json) {
        json = (json === '') ? '{}' : json;
        const { id_restaurante, tipo, nombre_plato, precio, descripcion } = JSON.parse(json);
        if (!id_restaurante)
            throw custom_errors_1.CustomError.badRequest('Missing id_restaurante');
        if (!tipo)
            throw custom_errors_1.CustomError.badRequest('Missing tipo');
        if (!nombre_plato)
            throw custom_errors_1.CustomError.badRequest('Missing nombre_plato');
        if (!precio)
            throw custom_errors_1.CustomError.badRequest('Missing precio');
        if (!descripcion)
            throw custom_errors_1.CustomError.badRequest('Missing descripcion');
        return new MenuEntity(id_restaurante, tipo, nombre_plato, precio, descripcion);
    }
}
exports.MenuEntity = MenuEntity;
