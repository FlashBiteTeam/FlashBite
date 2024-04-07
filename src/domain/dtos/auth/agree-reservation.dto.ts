import { regularExps } from "../../../config";

export class AgreeReservationDto{
    constructor(
        public readonly emailUsuario:string,
        public readonly emailRestaurante:string,
        
    ){}
    static create(object: {[key:string]:any}):[string?, AgreeReservationDto?]{

        const {emailUsuario,emailRestaurante} = object;
        console.log(emailRestaurante)
        if (!emailRestaurante) return ['Restaurant email is missing', undefined];
        if(!regularExps.email.test(emailRestaurante)) return ['Restaurant email is not vaild', undefined];
        
        if (!emailUsuario) return ['User email is missing', undefined];
        if(!regularExps.email.test(emailUsuario)) return ['User email is not vaild', undefined];
        
        return [undefined, new AgreeReservationDto(emailUsuario,emailRestaurante)]

    }
}