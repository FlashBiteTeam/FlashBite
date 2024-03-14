import { OTPModel } from "../../data/mongo/models/otp.model";
import { OTPEntity } from "../../domain";
import { OTPDatasource } from "../../domain/datasources/otp.datasource";


export class MongoOTPDatasource implements OTPDatasource{

    async saveOTP(otp: OTPEntity): Promise<void> {
        const newOTP = await OTPModel.create(otp);
        console.log('Mongo OTP created:', newOTP);
    }
    async deleteOne(email: string): Promise<void> {
        await OTPModel.deleteOne({email});
    }
    
    
}