import { CustomError } from "../errors/custom.errors";

export class HistorialEntity {
    constructor(
        public id_restaurante: string,
        public id_usuario: string,
        public comentario: string,
        public calificacion: string,
        public hora: string,
        public fecha: string,
        public estado?: string
    ) { }

    static fromObject(object: { [key: string]: any }): HistorialEntity {
        const { id_restaurante, id_usuario, comentario, calificacion, hora, fecha, estado } = object;

        if (!id_restaurante) throw CustomError.badRequest('Missing id_restaurante');
        if (!id_usuario) throw CustomError.badRequest('Missing id_usuario');
        if (!hora) throw CustomError.badRequest('Missing hora');
        if (!fecha) throw CustomError.badRequest('Missing fecha');

        return new HistorialEntity(
            id_restaurante,
            id_usuario,
            comentario ,
            calificacion , 
            hora,
            fecha,
            estado
        );
    }

    static fromJson(json: string): HistorialEntity {
        json = (json === '') ? '{}' : json;
        const { id_restaurante, id_usuario, comentario, calificacion, hora, fecha, estado } = JSON.parse(json);

        if (!id_restaurante) throw CustomError.badRequest('Missing id_restaurante');
        if (!id_usuario) throw CustomError.badRequest('Missing id_usuario');
        if (!hora) throw CustomError.badRequest('Missing hora');
        if (!fecha) throw CustomError.badRequest('Missing fecha');

        return new HistorialEntity(
            id_restaurante,
            id_usuario,
            comentario,
            calificacion ,
            hora,
            fecha,
            estado
        );
    }
}
