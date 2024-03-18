import { CustomError } from "../errors/custom.errors";

export class UsuarioEntity{
    constructor(
        public nombre: string,
        public email: string,
        public emailValidado: boolean,
        public contrasena: string,
        public numero: string,
        public role?: string,
    
    ){}


    static fromObject(object:{[key:string]:any}){
        const {nombre, email, emailValidado, contrasena, numero, role} = object;


        if(!nombre) throw CustomError.badRequest('Missing name');

        if(!email) throw CustomError.badRequest('Missing email');

        if(emailValidado === undefined) throw CustomError.badRequest('Missing emailValidated');

        if(!contrasena) throw CustomError.badRequest('Missing password');
        
        if(!numero) throw CustomError.badRequest('Missing numero');



        
        return new UsuarioEntity(nombre, email, emailValidado, contrasena, numero,role);
        
    }
    static fromJson = (json:string):UsuarioEntity =>{

        json = (json=== '') ? '{}': json;
        const {nombre, email, emailValidado, contrasena, numero,role} = JSON.parse(json);
        const usuario = new UsuarioEntity(
            nombre, email, emailValidado, contrasena, numero,role);
        return usuario;

    }


}





