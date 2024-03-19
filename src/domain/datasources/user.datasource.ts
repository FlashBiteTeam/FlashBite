import { RegisterUserDto, UsuarioEntity} from "../../domain";
import { VerifyOTPDto } from "../dtos/auth/verify-otp.dtp.t";

export abstract class UserDatasource {
    
    abstract findOne(email: string, emailValidado: boolean):Promise<UsuarioEntity | null>;
    abstract createUser(dto:RegisterUserDto):Promise<UsuarioEntity>;
    abstract validateEmail(dto:VerifyOTPDto):Promise<boolean>;
        
}
