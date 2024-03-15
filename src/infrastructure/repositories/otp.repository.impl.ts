import { OTPEntity } from "../../domain";
import { OTPDatasource } from "../../domain/datasources/otp.datasource";
import { OTPRepository } from "../../domain/repository/otp.repository";

export class OTPRepositoryImpl implements OTPRepository{


    constructor(
        private readonly otpDatasource:OTPDatasource
    ){}
    async saveOTP(otp: OTPEntity): Promise<void> {
        return this.otpDatasource.saveOTP(otp);
    }
    async deleteOne(email: string): Promise<void> {
        return this.otpDatasource.deleteOne(email);
    }
    
} 