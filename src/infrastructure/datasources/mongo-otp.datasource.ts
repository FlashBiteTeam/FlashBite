import { OTPModel } from "../../data/mongo/models/otp.model";
import { OTPEntity } from "../../domain";
import { OTPDatasource } from "../../domain/datasources/otp.datasource";
import { VerifyOTPDto } from "../../domain/dtos/auth/verify-otp.dtp.t";


export class MongoOTPDatasource implements OTPDatasource{

    async saveOTP(otp: OTPEntity): Promise<void> {
        const newOTP = await OTPModel.create(otp);
        console.log('Mongo OTP created:', newOTP);
    }
    async deleteOne(email: string): Promise<void> {
         await OTPModel.deleteOne({email});
    }
    async findOne(verifyOTPDto:VerifyOTPDto):Promise<OTPEntity | null>{
        const { email } = verifyOTPDto; 
        const foundDTO = await OTPModel.findOne({ email });
        if (foundDTO) {
            return OTPEntity.fromObject(foundDTO);
        } else {
            console.log("No se encontró ningún OTP con el email proporcionado.");
            return null;
        }
    }
}