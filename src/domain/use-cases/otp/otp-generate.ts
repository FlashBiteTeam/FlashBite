import { OTPEntity, RegisterUserDto } from "../../../domain";
import { CustomError } from "../../errors/custom.errors";
import { OTPRepository } from "../../repository/otp.repository";


export interface OTPGenerateUseCase {
    execute(email:string , duration:number): Promise<OTPEntity>;
}

export class OTPgenerate implements OTPGenerateUseCase {
    constructor(private readonly repository: OTPRepository) {}

    async execute(email:string, duration:number): Promise<OTPEntity> {
        try {
            
        
            const otpNumber = `${Math.floor(1000 + Math.random() * 90000)}`;

            const OTP = new OTPEntity({
                otp: otpNumber,
                email: email,
                creado: Date.now(),
                expira: Date.now() + 3600000*+ duration,

            });
            await this.repository.deleteOne(email);
            return OTP
        } catch (error) {
            throw CustomError.badRequest('There was an error');
        }
    }
}