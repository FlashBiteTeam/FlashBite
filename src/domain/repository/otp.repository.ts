import { OTPEntity} from "..";
import { VerifyOTPDto } from "../dtos/auth/verify-otp.dtp.t";

export abstract class OTPRepository {
    abstract saveOTP( otp: OTPEntity):Promise<void>;
    abstract deleteOne( email: string):Promise<void>;
    abstract findOne(verifyOTPDto:VerifyOTPDto):Promise<OTPEntity | null>;
    abstract saveOTPRestaurante( otp: OTPEntity):Promise<void>;
    abstract deleteOneRestaurante( email: string):Promise<void>;
    abstract findOneRestaurante(verifyOTPDto:VerifyOTPDto):Promise<OTPEntity | null>;

}
