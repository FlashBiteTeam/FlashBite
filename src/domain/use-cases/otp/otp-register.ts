import { OTPEntity, RegisterUserDto } from "../../../domain";
import { CustomError } from "../../errors/custom.errors";
import { OTPRepository } from "../../repository/otp.repository";


export interface OTPRegisterUseCase {
    execute(dto: RegisterUserDto): Promise<void>;
}

export class OTPRegister implements OTPRegisterUseCase {
    constructor(private readonly repository: OTPRepository) {}

    async execute(dto: RegisterUserDto): Promise<void> {
        try {
            const { email } = dto;
            console.log('Email del usuario desde el caso de uso: ', email);
        
            const otpNumber = `${Math.floor(1000 + Math.random() * 90000)}`;
            const OTP = new OTPEntity({
                message: otpNumber,
                email: email,
                subject: 'Asunto de ejemplo', 
                duration: 1 
            });
            await this.repository.deleteOne(dto.email);
            console.log('OTP generado: ', OTP);

            await this.repository.saveOTP(OTP);
        } catch (error) {
            throw CustomError.badRequest('There was an error');
        }
    }
}