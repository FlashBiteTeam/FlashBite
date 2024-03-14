import { CustomError } from "../errors/custom.errors";

export class UsuarioEntity{
    constructor(
        public name: string,
        public email: string,
        public emailValidado: boolean,
        public contraseña: string,
        public numero: string,
        public role: string,
    
    ){}


    static fromObject(object:{[key:string]:any}){
        const {name, email, emailValidado, contraseña, numero, role} = object;


        if(!name) throw CustomError.badRequest('Missing name');

        if(!email) throw CustomError.badRequest('Missing email');

        if(emailValidado === undefined) throw CustomError.badRequest('Missing emailValidated');

        if(!contraseña) throw CustomError.badRequest('Missing password');
        
        if(!numero) throw CustomError.badRequest('Missing numero');

        if(!role) throw CustomError.badRequest('Missing role');


        
        return new UsuarioEntity(name, email, emailValidado, contraseña, numero,role);
        
    }
}





