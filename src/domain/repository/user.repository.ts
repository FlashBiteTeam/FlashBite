import { RegisterUserDto, UsuarioEntity} from "../../domain";
import { VerifyOTPDto } from "../dtos/auth/verify-otp.dtp.t";

export abstract class UserRepository {
    
    abstract findOne(email: string, emailValidado: boolean):Promise<UsuarioEntity | null>;
    abstract createUser(dto:RegisterUserDto):Promise<UsuarioEntity | null>;
    abstract validateEmail(dto:VerifyOTPDto):Promise<boolean>;

}
