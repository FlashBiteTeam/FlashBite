import { bcriptAdapter } from "../../config/bcrypt.adapter";
import { OTPEntity, RegisterUserDto } from "../../domain";
import { CustomError } from "../../domain/errors/custom.errors";
import { OTPRepository } from "../../domain/repository/otp.repository";
import { UserRepository } from "../../domain/repository/user.repository";
import { OTPRegister } from "../../domain/use-cases/otp/otp-register";
import { UserRegister } from "../../domain/use-cases/user/register";
import { EmailService } from "./email.service";

export class AuthService{
    constructor(
        private readonly emailService:EmailService,
        private readonly otpRepository:OTPRepository,
        private readonly userRepository: UserRepository

        
    ){}

    public async registerUser(registerUserDto:RegisterUserDto){

        
        try {
            const user = await new UserRegister(this.userRepository).execute(registerUserDto);
            const {contrasena, ...newUser} =  user; 
            
            
            // * generar OTP
            const tiempoExpiracion:number= 1;
            const newOtp = await  new OTPRegister(this.otpRepository).execute(registerUserDto,tiempoExpiracion);
            // * Separar codigo de la contra

            const { otp, ...Otp} = newOtp;

            // * Enviar correo con otp
            await this.sendEmailValidationLink(registerUserDto.email,otp,tiempoExpiracion);
            // * Hashear Codigo
            const otpHashed = bcriptAdapter.hash(otp);  
            const otpDB = new OTPEntity({
                otp:otpHashed,
                ...Otp
            }) 
            this.otpRepository.saveOTP(otpDB);
            
            return {
            user: newUser,
            otpGenerated: true,
            };

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    private sendEmailValidationLink = async (email:string,otp:string,expira:number) =>{


        
        const html = `
        <html lang="es">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Valida tu correo electrónico en Flashbite</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    color: #333;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
        
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
        
                .header {
                    background-color: #FF0000;
                    color: #fff;
                    padding: 10px;
                    text-align: center;
                    border-radius: 10px 10px 0 0;
                }
                .main {
                    background-color: #ff6347;
                    color: #fff;
                    padding: 10px;
                    text-align: center;
                }
                h1 {
                    text-align: center;
                }
        
                p {
                    color: #fff;
                }
        
               
            </style>
        </head>
        
        <body>
            <div class="container">
                <div class="header">
                    <h1>¡Bienvenido a Flashbite!</h1>
                </div>
                <div class="main">
                <p>Por favor, valida tu dirección de correo electrónico para completar el registro.</p>
                <p>Tu código de verificación OTP es: <strong>${otp}</strong>.</p>
                <p>Este código expirará en ${expira} horas.</p>
                <p>Por favor, ve a la aplicación e ingresa el código de validación para validar tu correo ${email}</p>
                </div>
            </div>
        </body>
        
        </html>`
        ;

        const options = {
            to:email,
            subject: 'validate your email',
            htmlBody: html,
        }

        const issent = await this.emailService.sendEmail(options);

        if(!issent) throw CustomError.internalServer('Error sending email');

        return true;
    }
}