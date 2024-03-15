import { bcriptAdapter } from "../../../config/bcrypt.adapter";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { UsuarioEntity } from "../../entities/usuario.entity";
import { CustomError } from "../../errors/custom.errors";
import { UserRepository } from "../../repository/user.repository";

export interface UserRegisterUseCase {
    execute(dto: RegisterUserDto):any;

}


export class UserRegister implements UserRegisterUseCase{
    constructor(private readonly repository: UserRepository) {}


    async execute(dto: RegisterUserDto) {
        const existUser = await this.repository.findOne(dto.email,true);
        console.log(existUser);
        if(existUser) throw CustomError.badRequest('El email ya esta registrado');


        try {
            const usuarioRegistrado = await this.repository.findOne(dto.email,false);
            if(usuarioRegistrado) {
              return usuarioRegistrado;
             }
             
             const { contrasena, ...userDto } = dto;
             const contrasenaHasheada = bcriptAdapter.hash(contrasena); 
             //* hash password
             const user = await this.repository.createUser({ ...userDto, contrasena: contrasenaHasheada }); 
            return user;
          } catch (error) {
            throw CustomError.internalServer(`${error}`);
          }

    }
    
}



   

  