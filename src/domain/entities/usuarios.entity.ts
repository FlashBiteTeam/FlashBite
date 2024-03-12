import { CustomError } from "../errors/custom.errors";

export class UsuarioGeneralEntity{
    constructor(
        public name: string,
        public email: string,
        public emailValidated: boolean,
        public password: string,
        public role: string,
    
    ){}


    static fromObject(object:{[key:string]:any}){
        const {name, email, emailValidated, password, role} = object;

        

        if(!name) throw CustomError.badRequest('Missing name');

        if(!email) throw CustomError.badRequest('Missing email');

        if(emailValidated === undefined) throw CustomError.badRequest('Missing emailValidated');

        if(!password) throw CustomError.badRequest('Missing password');

        if(!role) throw CustomError.badRequest('Missing role');


        
        return new UsuarioGeneralEntity(name, email, emailValidated, password, role);
        
    }
}





