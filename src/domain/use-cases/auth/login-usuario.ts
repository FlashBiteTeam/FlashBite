import { bcriptAdapter } from "../../../config/bcrypt.adapter";
import { JwtAdapter } from "../../../config/jwt.adapter";
import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { RestauranteEntity } from "../../entities/restaurante.entity";
import { UsuarioEntity } from "../../entities/usuario.entity";
import { CustomError } from "../../errors/custom.errors";
import { RestauranteRepository } from "../../repository/restaurante.repository";
import { UserRepository } from "../../repository/user.repository";

export interface UserLoginUseCase{
    execute(dto: LoginUserDto):Promise<LoginResult>;

}
interface LoginResult {
    user: Partial<UsuarioEntity | RestauranteEntity>; 
    tipo: string;
    token: {}; 
}

export class UserLogin implements UserLoginUseCase{
    constructor(private readonly userRepository: UserRepository,
        private readonly restauranteRepository: RestauranteRepository
        ) {}


        async execute(dto: LoginUserDto):Promise<LoginResult> {
            const existUser = await this.userRepository.findOne(dto.email,true)
            const existRestaurante = await this.restauranteRepository.findOne(dto.email,true)
    
            if(!existUser && !existRestaurante) throw CustomError.badRequest('This email is not registered or authenticated');
    
            //Todo buscar restaurante tambien
            if(existUser){
                const isMatching = bcriptAdapter.compare(dto.contrasena,existUser.contrasena);
                if(!isMatching) throw CustomError.badRequest('Password is not valid');
                const {contrasena, ...userEntity} = UsuarioEntity.fromObject(existUser);
                
                const token = await JwtAdapter.generateToken({email:userEntity.email})
                if(!token) throw CustomError.internalServer('Error while creating JWT');
                return{
                    user: userEntity,
                    token: token,
                    tipo: 'usuario'
                }
            }
            if(existRestaurante){
                const isMatching = bcriptAdapter.compare(dto.contrasena,existRestaurante.contrasena);
                if(!isMatching) throw CustomError.badRequest('Password is not valid');
                const {contrasena, ...restauranteEntity} = RestauranteEntity.fromObject(existRestaurante);
                
                const token = await JwtAdapter.generateToken({email:restauranteEntity.email})
                if(!token) throw CustomError.internalServer('Error while creating JWT');
                return{
                    user: restauranteEntity,
                    token: token,
                    tipo: 'restaurante'
                }
            }else{

                throw CustomError.internalServer('Unexpected error occurred');
            }

        }
    
}



   

  