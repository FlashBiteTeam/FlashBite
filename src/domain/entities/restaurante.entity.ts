import { CustomError } from "../errors/custom.errors";

export class RestauranteEntity{
    constructor(
        public nombre: string,
        public email: string,
        public emailValidado: boolean,
        public contraseña: string,
        public numero: string,
        public direccion: string,
        public nit: string,
        public role: string,
    
    ){}


    static fromObject(object:{[key:string]:any}){
        const {nombre, email, emailValidado, contraseña, numero,direccion, nit, role} = object;


        if(!nombre) throw CustomError.badRequest('Missing name');

        if(!email) throw CustomError.badRequest('Missing email');

        if(emailValidado === undefined) throw CustomError.badRequest('Missing emailValidated');

        if(!numero) throw CustomError.badRequest('Missing numero');
        
        if(!direccion) throw CustomError.badRequest('Missing direccion');

        if(!contraseña) throw CustomError.badRequest('Missing password');

        if(!direccion) throw CustomError.badRequest('Missing password');

        if(!role) throw CustomError.badRequest('Missing role');


        
        return new RestauranteEntity(nombre, email, emailValidado, contraseña, numero,direccion, nit,role);
        
    }
}





