import { bcriptAdapter } from "../../../config/bcrypt.adapter";
import { RegisterRestauranteDto } from "../../dtos/auth/register-restaurante";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { UsuarioEntity } from "../../entities/usuario.entity";
import { CustomError } from "../../errors/custom.errors";
import { RestauranteRepository } from "../../repository/restaurante.repository";
import { UserRepository } from "../../repository/user.repository";

export interface RestauranteRegisterUseCase {
    execute(dto: RegisterRestauranteDto):any;

}


export class RestauranteRegister implements RestauranteRegisterUseCase{
    constructor(private readonly repository: RestauranteRepository) {}


    async execute(dto: RegisterRestauranteDto) {
        const existUser = await this.repository.findOne(dto.email,true);
        console.log(existUser);
        if(existUser) throw CustomError.badRequest('El email ya esta registrado');


        try {
            const usuarioRegistrado = await this.repository.findOne(dto.email,false);
            if(usuarioRegistrado) {
              return usuarioRegistrado;
             }
             
             const { contrasena, ...RegisterRestauranteDto } = dto;
             const contrasenaHasheada = bcriptAdapter.hash(contrasena); 
             //* hash password
             const user = await this.repository.createRestaurante({ ...RegisterRestauranteDto, contrasena: contrasenaHasheada }); 
            return user;
          } catch (error) {
            throw CustomError.internalServer(`${error}`);
          }

    }
    
}



   

  