import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { CustomError } from "../../errors/custom.errors";
import { UserRepository } from "../../repository/user.repository";

export interface UserRegisterUseCase {
    execute(dto: RegisterUserDto):any;

}


export class UserRegister implements UserRegisterUseCase{
    constructor(private readonly repository: UserRepository) {}


    async execute(dto: RegisterUserDto) {
        const existUser = await this.repository.findOne(dto.email);
        console.log(existUser);
        if(existUser) throw CustomError.badRequest('El email ya esta registrado');
        
        try {
            // TODO password
            const user = await this.repository.createUser(dto);
            return user;
          } catch (error) {
            throw CustomError.internalServer(`${error}`);
          }

    }
    
}



   

  