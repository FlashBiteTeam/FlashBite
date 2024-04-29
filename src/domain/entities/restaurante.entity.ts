import { CustomError } from "../errors/custom.errors";

export class RestauranteEntity{
    constructor(
        public nombre: string,
        public email: string,
        public emailValidado: boolean,
        public contrasena: string,
        public numero: string,
        public direccion: string,
        public nit: string,
        public tipoComida?: string,
    
    ){}


    static fromObject(object:{[key:string]:any}){
        const {nombre, email, emailValidado, contrasena, numero,direccion, nit,tipoComida} = object;


        if(!nombre) throw CustomError.badRequest('Missing name');

        if(!email) throw CustomError.badRequest('Missing email');


        if(!numero) throw CustomError.badRequest('Missing numero');
        
        if(!direccion) throw CustomError.badRequest('Missing direccion');

        if(!contrasena) throw CustomError.badRequest('Missing password');

        if(!direccion) throw CustomError.badRequest('Missing password');



        
        return new RestauranteEntity(nombre, email, emailValidado, contrasena, numero,direccion, nit,tipoComida);
        
    }

    static fromJson = (json:string):RestauranteEntity =>{

        json = (json=== '') ? '{}': json;
        const {nombre, email, emailValidado, contrasena, numero,direccion, nit,tipoComida} = JSON.parse(json);
        const usuario = new RestauranteEntity(
            nombre, email, emailValidado, contrasena, numero,direccion, nit,tipoComida);
        return usuario;

    }
}





