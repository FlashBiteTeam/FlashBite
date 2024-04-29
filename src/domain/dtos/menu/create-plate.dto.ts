import { regularExps } from "../../../config";

export class CrearPlatoDto{
    constructor(
        public id_restaurante: string,
        public tipo: string,
        public nombre_plato: string,
        public precio: string,
        public descripcion: string,
    ){}

    static create(object: {[key:string]:any}):[string?,CrearPlatoDto?]{
        const {id_restaurante, tipo, nombre_plato, precio, descripcion} = object;

        if(!id_restaurante) return ['Missing id_Restaurante email addres', undefined];

        if(!tipo) return['Missing tipo', undefined];
        
        if(!regularExps.email.test(id_restaurante)) return ['id_Restaurante Email is not vaild', undefined];

        if(!nombre_plato) return ['Missing nombre_plato', undefined];

        if(!precio) return ['Missing precio', undefined];

        if(!descripcion) return ['Missing descripcion', undefined];

        return [undefined, new  CrearPlatoDto(id_restaurante, tipo, nombre_plato, precio, descripcion)];

    }
}