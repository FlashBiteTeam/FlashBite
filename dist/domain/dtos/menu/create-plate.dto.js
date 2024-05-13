"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrearPlatoDto = void 0;
const config_1 = require("../../../config");
class CrearPlatoDto {
    constructor(id_restaurante, tipo, nombre_plato, precio, descripcion) {
        this.id_restaurante = id_restaurante;
        this.tipo = tipo;
        this.nombre_plato = nombre_plato;
        this.precio = precio;
        this.descripcion = descripcion;
    }
    static create(object) {
        const { id_restaurante, tipo, nombre_plato, precio, descripcion } = object;
        if (!id_restaurante)
            return ['Missing id_Restaurante email addres', undefined];
        if (!tipo)
            return ['Missing tipo', undefined];
        if (!config_1.regularExps.email.test(id_restaurante))
            return ['id_Restaurante Email is not vaild', undefined];
        if (!nombre_plato)
            return ['Missing nombre_plato', undefined];
        if (!precio)
            return ['Missing precio', undefined];
        if (!descripcion)
            return ['Missing descripcion', undefined];
        return [undefined, new CrearPlatoDto(id_restaurante, tipo, nombre_plato, precio, descripcion)];
    }
}
exports.CrearPlatoDto = CrearPlatoDto;
