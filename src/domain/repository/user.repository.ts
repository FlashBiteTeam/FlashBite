import { RegisterUserDto, UsuarioEntity} from "../../domain";

export abstract class UserRepository {
    
    abstract findOne(email: string, emailValidado: boolean):Promise<UsuarioEntity | null>;
    abstract createUser(dto:RegisterUserDto):Promise<UsuarioEntity>;
        
}
