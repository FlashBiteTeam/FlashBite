import { RegisterUserDto } from "../../domain";
import { CustomError } from "../../domain/errors/custom.errors";
import { OTPRepository } from "../../domain/repository/otp.repository";
import { UserRepository } from "../../domain/repository/user.repository";
import { OTPRegister } from "../../domain/use-cases/otp/otp-register";
import { UserRegister } from "../../domain/use-cases/user/register";

export class AuthService{
    constructor(
        // private readonly emailService:EmailService
        private readonly otpRepository:OTPRepository,
        private readonly userRepository: UserRepository

        
    ){}

    public async registerUser(registerUserDto:RegisterUserDto){

        
        try {
            const user = await new UserRegister(this.userRepository).execute(registerUserDto);
            await new OTPRegister(this.otpRepository).execute(registerUserDto);
            const {contrasena, ...newUser} =  user; 
            return {
            user: newUser,
            otpGenerated: true
            };

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

}