export class LoginUserDto{
    constructor(
        public readonly email:string,
        public readonly contrasena:string
    ){}

    static create(object: {[key:string]:any}):[string?,LoginUserDto?]{
        const {email, contrasena} = object;

        if(!email) return ['Missing email', undefined];
        if(!contrasena) return ['Missing password', undefined];

        return [undefined, new LoginUserDto(email,contrasena)];
    }
}