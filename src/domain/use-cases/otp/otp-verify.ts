import { bcriptAdapter } from "../../../config/bcrypt.adapter";
import { OTPEntity, RegisterUserDto } from "../../../domain";
import { VerifyOTPDto } from "../../dtos/auth/verify-otp.dtp.t";
import { CustomError } from "../../errors/custom.errors";
import { OTPRepository } from "../../repository/otp.repository";


export interface OTPVerifyUseCase {
    execute(verifyOTPDto: VerifyOTPDto): Promise<boolean>;
}

export class OTPVerify implements OTPVerifyUseCase {
    constructor(private readonly repository: OTPRepository) {}

    async execute(verifyOTPDto: VerifyOTPDto): Promise<boolean> {
        try {   
            const existOTP = await this.repository.findOne(verifyOTPDto);

            if (existOTP) {
                console.log(existOTP);
                
                const{expira, otp} = existOTP; 
                console.log(expira,otp)
                if(expira < Date.now()){
                    throw CustomError.notFound('OTP has expired or not found. Request for a new one');
                }
                try {
                    const match = await bcriptAdapter.compare(verifyOTPDto.otp, otp);
                    if(!match){
                        return false;
                        
                    }else{
                        this.repository.deleteOne(verifyOTPDto.email);
                        return true;
                    }
                } catch (error) {
                    throw CustomError.notFound('OTP does not match');
                }
                
            } else {
                return false;
            }           
        } catch (error) {
            throw CustomError.badRequest('There was an error');
        }
    }
}