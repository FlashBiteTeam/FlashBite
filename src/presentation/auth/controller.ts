import { Request, Response,  } from "express";
import { RegisterUserDto } from "../../domain";
import { OTPRepository } from "../../domain/repository/otp.repostory";
import { OTPRegister } from "../../domain/use-cases/otp/otp-register";

export  class AuthController{
    
    constructor(
        private readonly todoRepository:OTPRepository,
    ){};

    registerUser = (req:Request, res:Response)=>{
        const [error, registerDto] = RegisterUserDto.create(req.body);
        console.log(registerDto);  
        if(error) return res.status(400).json({error});
        if(registerDto){
            new OTPRegister(this.todoRepository)
            .execute(registerDto)
            .then(() => res.status(200).json({message:'Otp Enviado'}))
            .catch(error => res.status(400).json({error}));
            
        }
        
    }
}