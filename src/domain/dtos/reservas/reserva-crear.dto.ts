import { regularExps } from "../../../config";

export class CrearReservaDto{
    constructor(
        public restaurante: string,
        public usuario: string,
        public hora: string,
        public fecha: string,
    ){}

    static create(object: {[key:string]:any}):[string?,CrearReservaDto?]{
        const horaActual = Date.now();
        const {restaurante, usuario, hora, fecha} = object;

        if(!restaurante) return ['Missing Restaurante email addres', undefined];

        if(!usuario) return['Missing Usuario Email', undefined];
        
        if(!regularExps.email.test(restaurante)) return ['Restaurante Email is not vaild', undefined];

        if(!regularExps.email.test(usuario)) return ['Usuario Email is not vaild', undefined];

        if(!hora) return ['Missing hour', undefined];

        if(!fecha) return ['Missing Fecha', undefined];

        return [undefined, new  CrearReservaDto(restaurante, usuario, hora, fecha)];

    }
}