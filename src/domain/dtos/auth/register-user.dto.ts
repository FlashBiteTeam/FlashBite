import { regularExps } from "../../../config/";

export class RegisterUserDto{
    constructor(
        public readonly nombre:string,
        public readonly email:string,
        public readonly contraseña:string,
        public readonly numero:string,
    ){}
    static create(object: {[key:string]:any}):[string?,RegisterUserDto?]{
        const {nombre, email, contraseña, numero} = object;

        if(!nombre) return ['Missing nombre', undefined];

        if(!email) return['Missing email', undefined];

        if(!numero) return['Missing numero', undefined];

        if(numero < 10 ) return['Not a valid number', undefined];

        if(!regularExps.email.test(email)) return ['Email is not vaild', undefined];

        if(!contraseña) return ['Missing contraseña', undefined];

        if(contraseña.length < 6) return ['contraseña too short', undefined];

        return [undefined, new RegisterUserDto(nombre,email,contraseña,numero)]

    }
}