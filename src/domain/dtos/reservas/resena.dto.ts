import { regularExps } from "../../../config";

export class ResenaDto{
    constructor(
        public readonly emailUsuario:string,
        public readonly emailRestaurante:string,
        public readonly comentario:string,
        public readonly calificacion:string,
        public readonly hora:string,
        public readonly fecha:string,


        
    ){}
    static create(object: {[key:string]:any}):[string?, ResenaDto?]{

        const {emailUsuario,emailRestaurante,comentario,calificacion,hora,fecha} = object;

        if (!emailRestaurante) return ['Restaurant email is missing', undefined];
        if(!regularExps.email.test(emailRestaurante)) return ['Restaurant email is not vaild', undefined];
        
        if (!emailUsuario) return ['User email is missing', undefined];
        if(!regularExps.email.test(emailUsuario)) return ['User email is not vaild', undefined];

        if(!comentario) return ['Comentario can not be null', undefined];

        if(!calificacion) return ['calificacion can not be null', undefined];

        if(!hora) return ['hora can not be null', undefined];

        if(!fecha) return ['fecha can not be null', undefined];
        
        return [undefined, new ResenaDto(emailUsuario,emailRestaurante,comentario,calificacion,hora,fecha)]

    }
}