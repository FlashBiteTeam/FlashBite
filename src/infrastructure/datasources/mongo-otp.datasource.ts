
import { OTP } from "../../data";
import { OTPEntity } from "../../domain";
import { OTPDatasource } from "../../domain/datasources/otp.datasource";
import { VerifyOTPDto } from "../../domain/dtos/auth/verify-otp.dtp.t";


export class MongoOTPDatasource implements OTPDatasource{

    async saveOTP(otp: OTPEntity): Promise<void> {
        const mappedOTP = {
            email: otp.email,
            otp: otp.otp,
            creado: otp.creado,
            expira: otp.expira
        };
    
        const newOTP = await OTP.create(mappedOTP);
        console.log('Mongo OTP created:', newOTP);
    }
    async deleteOne(email: string): Promise<void> {
        await OTP.destroy({
            where: {
                email: email
            }
        });
    }
    async findOne(verifyOTPDto: VerifyOTPDto): Promise<OTPEntity | null> {
        const { email } = verifyOTPDto;
    
        try {
            const foundOTP = await OTP.findOne({
                where: { email: email }
            });
    
            if (foundOTP) {
                return OTPEntity.fromObject(foundOTP.toJSON());
            } else {
                console.log("No se encontró ningún OTP con el email proporcionado.");
                return null;
            }
        } catch (error) {
            console.error("Error al buscar OTP:", error);
            return null;
        }
    }
}