import { UsuarioEntity, RegisterUserDto } from "../../domain";
import { UserDatasource } from "../../domain/datasources/user.datasource";
import { UserRepository } from "../../domain/repository/user.repository";

export class UserRepositoryImpl implements UserRepository{

    constructor(
        private readonly userDatasource:UserDatasource
    ){}
    findOne(email: string): Promise<UsuarioEntity | null> {
        return this.userDatasource.findOne(email);
    }
    createUser(dto: RegisterUserDto): Promise<UsuarioEntity> {
        return this.userDatasource.createUser(dto);
    }
    
}