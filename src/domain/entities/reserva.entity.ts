import { CustomError } from "../errors/custom.errors";

export class ReservaEntity{
    constructor(
        public id_restaurante: string,
        public id_usuario: string,
        public hora: string,
        public fecha: string,
        public estado: string

    
    ){}


    static fromObject(object:{[key:string]:any}){
        const {id_restaurante, id_usuario, hora, fecha, estado} = object;


        if(!id_restaurante) throw CustomError.badRequest('Missing id_restaurante email');

        if(!id_usuario) throw CustomError.badRequest('Missing id_usuario email');

        if(!hora) throw CustomError.badRequest('Missing hora');
        
        if(!fecha) throw CustomError.badRequest('Missing fecha');

        
        return new ReservaEntity(id_restaurante, id_usuario, hora, fecha, estado);
        
    }

    static fromJson = (json:string):ReservaEntity =>{

        json = (json=== '') ? '{}': json;
        const {id_restaurante, id_usuario, hora, fecha, estado}  = JSON.parse(json);
        const reserva = new ReservaEntity(
            id_restaurante, id_usuario, hora, fecha, estado);
        return reserva;

    }
}





