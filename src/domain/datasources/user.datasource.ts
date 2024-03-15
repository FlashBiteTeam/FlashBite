import { RegisterUserDto, UsuarioEntity} from "../../domain";

export abstract class UserDatasource {
    
    abstract findOne(email: string):Promise<UsuarioEntity | null>;
    abstract createUser(dto:RegisterUserDto):Promise<UsuarioEntity>;
        
}
