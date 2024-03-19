import { regularExps } from "../../../config/";

export class RegisterUserDto{
    constructor(
        public readonly nombre:string,
        public readonly email:string,
        public readonly contrasena:string,
        public readonly numero:string,
    ){}
    static create(object: {[key:string]:any}):[string?,RegisterUserDto?]{
        const {nombre, email, contrasena, numero} = object;

        if(!nombre) return ['Missing nombre', undefined];

        if(!email) return['Missing email', undefined];

        if(!numero) return['Missing numero', undefined];

        if(numero < 10 ) return['Not a valid number', undefined];

        if(!regularExps.email.test(email)) return ['Email is not vaild', undefined];

        if(!contrasena) return ['Missing contraseña', undefined];

        if(contrasena.length < 6) return ['contraseña too short', undefined];

        return [undefined, new RegisterUserDto(nombre,email,contrasena,numero)]

    }
}