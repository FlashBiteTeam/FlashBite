import { bcriptAdapter } from "../../../config/bcrypt.adapter";
import { JwtAdapter } from "../../../config/jwt.adapter";
import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { UsuarioEntity } from "../../entities/usuario.entity";
import { CustomError } from "../../errors/custom.errors";
import { UserRepository } from "../../repository/user.repository";

export interface UserLoginUseCase{
    execute(dto: LoginUserDto):Promise<LoginResult>;

}
interface LoginResult {
    user: Partial<UsuarioEntity>; 
    token: {}; 
}

export class UserLogin implements UserLoginUseCase{
    constructor(private readonly repository: UserRepository) {}


    async execute(dto: LoginUserDto):Promise<LoginResult> {
        const existUser = await this.repository.findOne(dto.email,true)
        if(!existUser) throw CustomError.badRequest('This email is not registered or authenticated');

        const isMatching = bcriptAdapter.compare(dto.contrasena,existUser.contrasena);
        if(!isMatching) throw CustomError.badRequest('Password is not valid');
        const {contrasena, ...userEntity} = UsuarioEntity.fromObject(existUser);
        
        const token = await JwtAdapter.generateToken({email:userEntity.email})
        if(!token) throw CustomError.internalServer('Error while creating JWT');
        return{
            user: userEntity,
            token: token,
        }
    }
    
}



   

  