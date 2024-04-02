import { OTPEntity, RegisterUserDto } from "../../../domain";
import { CustomError } from "../../errors/custom.errors";
import { OTPRepository } from "../../repository/otp.repository";


export interface OTPRegisterUseCase {
    execute(dto: RegisterUserDto, duration:number): Promise<OTPEntity>;
}

export class OTPRegisterRestaurante implements OTPRegisterUseCase {
    constructor(private readonly repository: OTPRepository) {}

    async execute(dto: RegisterUserDto, duration:number): Promise<OTPEntity> {
        try {
            const { email } = dto;
            const otpNumber = `${Math.floor(1000 + Math.random() * 90000)}`;

            const OTP = new OTPEntity({
                otp: otpNumber,
                email: email,
                creado: Date.now(),
                expira: Date.now() + 3600000*+ duration,

            });
            await this.repository.deleteOneRestaurante(dto.email);
            console.log('Se borro')
            return OTP
        } catch (error) {
            throw CustomError.badRequest('There was an error');
        }
    }
}