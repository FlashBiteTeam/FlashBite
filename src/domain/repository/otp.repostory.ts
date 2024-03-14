import { OTPEntity} from "../../domain";

export abstract class OTPRepository {
    abstract saveOTP( otp: OTPEntity):Promise<void>;
    abstract deleteOne( email: string):Promise<void>;
    
}
