import { regularExps } from "../../../config";

export class RegisterRestauranteDto{
    constructor(
        public readonly nombre:string,
        public readonly direccion:string,
        public readonly email:string,
        public readonly nit:string,
        public readonly contrasena:string,
        public readonly numero:string,
    ){}
    static create(object: {[key:string]:any}):[string?,RegisterRestauranteDto?]{
        const {nombre, direccion, email, nit,contrasena,numero} = object;

        if(!nombre) return ['Missing name', undefined];

        if(!direccion) return['Missing direccion', undefined];

        if(!email) return['Missing email', undefined];

        if(!nit) return['Missing nit', undefined];
        
        if(!regularExps.email.test(email)) return ['Email is not vaild', undefined];
        
        if(!contrasena) return ['Missing password', undefined];
        
        if(contrasena.length < 6) return ['Password too short', undefined];

        if(!numero) return['Missing numero de telefono', undefined];

        return [undefined, new RegisterRestauranteDto(nombre, direccion, email, nit,contrasena,numero)]

    }
}