import { CustomError } from "../errors/custom.errors";

export class MenuEntity {
    constructor(
        public id_restaurante: string,
        public tipo: string,
        public nombre_plato: string,
        public precio: string,
        public descripcion: string,

    ) { }

    static fromObject(object: { [key: string]: any }): MenuEntity {
        const { id_restaurante, tipo, nombre_plato, precio, descripcion} = object;

        if (!id_restaurante) throw CustomError.badRequest('Missing id_restaurante');
        if (!tipo) throw CustomError.badRequest('Missing tipo');
        if (!nombre_plato) throw CustomError.badRequest('Missing nombre_plato');
        if (!precio) throw CustomError.badRequest('Missing precio');
        if (!descripcion) throw CustomError.badRequest('Missing descripcion');

        return new MenuEntity(
            id_restaurante,
            tipo,
            nombre_plato ,
            precio , 
            descripcion,
        );
    }

    static fromJson(json: string): MenuEntity {
        json = (json === '') ? '{}' : json;
        const { id_restaurante, tipo, nombre_plato, precio, descripcion}  = JSON.parse(json);

        if (!id_restaurante) throw CustomError.badRequest('Missing id_restaurante');
        if (!tipo) throw CustomError.badRequest('Missing tipo');
        if (!nombre_plato) throw CustomError.badRequest('Missing nombre_plato');
        if (!precio) throw CustomError.badRequest('Missing precio');
        if (!descripcion) throw CustomError.badRequest('Missing descripcion');

        return new MenuEntity(
            id_restaurante,
            tipo,
            nombre_plato ,
            precio , 
            descripcion,
        );
    }
}
