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
    
    ){}


    static fromObject(object:{[key:string]:any}){
        const {nombre, email, emailValidado, contraseña, numero,direccion, nit} = object;


        if(!nombre) throw CustomError.badRequest('Missing name');

        if(!email) throw CustomError.badRequest('Missing email');


        if(!numero) throw CustomError.badRequest('Missing numero');
        
        if(!direccion) throw CustomError.badRequest('Missing direccion');

        if(!contraseña) throw CustomError.badRequest('Missing password');

        if(!direccion) throw CustomError.badRequest('Missing password');



        
        return new RestauranteEntity(nombre, email, emailValidado, contraseña, numero,direccion, nit);
        
    }

    static fromJson = (json:string):RestauranteEntity =>{

        json = (json=== '') ? '{}': json;
        const {nombre, email, emailValidado, contraseña, numero,direccion, nit} = JSON.parse(json);
        const usuario = new RestauranteEntity(
            nombre, email, emailValidado, contraseña, numero,direccion, nit);
        return usuario;

    }
}





