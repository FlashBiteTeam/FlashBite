import e, { Request, Response,  } from "express";
import { RegisterUserDto } from "../../domain";
import { OTPRepository } from "../../domain/repository/otp.repository";
import { OTPRegister } from "../../domain/use-cases/otp/otp-register";
import { UserRepository } from "../../domain/repository/user.repository";
import { UserRegister } from "../../domain/use-cases/user/register";
import { CustomError } from "../../domain/errors/custom.errors";
import { AuthService } from "../services/auth.service";
export  class AuthController{
    
    constructor(
        private readonly authService:AuthService,
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

            this.authService.registerUser(registerDto!)
            .then((user) => res.json(user))
            .catch(error => this.handleError(error, res));
        }
        
    }
}