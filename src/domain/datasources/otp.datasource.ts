import { OTPEntity} from "../../domain";

export abstract class OTPDatasource {
    abstract saveOTP( otp: OTPEntity):Promise<void>;
    abstract deleteOne( email: string):Promise<void>;
    
}
