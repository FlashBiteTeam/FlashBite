import { RegisterRestauranteDto } from "../dtos/auth/register-restaurante";
import { VerifyOTPDto } from "../dtos/auth/verify-otp.dtp.t";
import { RestauranteEntity } from "../entities/restaurante.entity";

export abstract class RestauranteRepository {
    
    abstract findOne(email: string, emailValidado: boolean):Promise<RestauranteEntity | null>;
    abstract createRestaurante(dto:RegisterRestauranteDto):Promise<RestauranteEntity>;
    abstract validateEmail(dto:VerifyOTPDto):Promise<boolean>;
    abstract findAll():Promise<RestauranteEntity[]>;
        
}
