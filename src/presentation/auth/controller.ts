import e, { Request, Response,  } from "express";
import { RegisterUserDto } from "../../domain";
import { OTPRepository } from "../../domain/repository/otp.repository";
import { OTPRegister } from "../../domain/use-cases/otp/otp-register";
import { UserRepository } from "../../domain/repository/user.repository";
import { UserRegister } from "../../domain/use-cases/auth/register-usuario";
import { CustomError } from "../../domain/errors/custom.errors";
import { AuthService } from "../services/auth.service";
import { VerifyOTPDto } from "../../domain/dtos/auth/verify-otp.dtp.t";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { RegisterRestauranteDto } from "../../domain/dtos/auth/register-restaurante";
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

    registerRestaurante = (req:Request, res:Response)=>{
        const [error, registerRestauranteDto] = RegisterRestauranteDto.create(req.body);
        if(error) return res.status(400).json({error});
        if(registerRestauranteDto){

            this.authService.registerRestaurante(registerRestauranteDto!)
            .then((user) => res.json(user))
            .catch(error => this.handleError(error, res));
        }
        
    }

    verifyUser = (req:Request, res:Response)=>{
        const [error, verifyOTPDto] = VerifyOTPDto.create(req.body);
        if(error) return res.status(400).json({error});
        if(verifyOTPDto){

            this.authService.verifyOTP(verifyOTPDto!)
            .then((message) => res.json({message}).status(200))
            .catch(error => this.handleError(error, res));
        }
        
    }
    login = (req:Request, res:Response)=>{
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if(error) return res.status(400).json({error});
        if(loginUserDto){

            this.authService.loginUser(loginUserDto!)
            .then((message) => res.json({message}).status(200))
            .catch(error => this.handleError(error, res));
        }
        
    }

    generateOTP = (req:Request, res:Response)=>{
        const {email} = req.body;
        if(!email) return res.status(400).json({error:'Argumento invalido'});
        if(email){

            this.authService.OTPGenerate(email!)
            .then((message) => res.json({message}).status(200))
            .catch(error => this.handleError(error, res));
        }
        
    }
}