import e, { Request, Response,  } from "express";
import { RegisterUserDto } from "../../domain";
import { OTPRepository } from "../../domain/repository/otp.repository";
import { OTPRegister } from "../../domain/use-cases/otp/otp-register";
import { UserRepository } from "../../domain/repository/user.repository";
import { UserRegister } from "../../domain/use-cases/user/register";
import { CustomError } from "../../domain/errors/custom.errors";
export  class AuthController{
    
    constructor(
        private readonly otpRepository:OTPRepository,
        private readonly userRepository: UserRepository
    ){};

    private handleError = (error:unknown, res: Response) => {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message});
        }

        return res.status(500).json({error: 'Internal server error'});
    }

    registerUser = (req:Request, res:Response)=>{
        const [error, registerDto] = RegisterUserDto.create(req.body);
        if(error) return res.status(400).json({error});
        if(registerDto){

           
            new UserRegister(this.userRepository)
           .execute(registerDto)
           .then((user) => res.status(200).json({user:user,message:'OTP enviado'}))
           .catch(error => this.handleError(error,res))
           
           new OTPRegister(this.otpRepository)
           .execute(registerDto)
           


        }
        
    }
}