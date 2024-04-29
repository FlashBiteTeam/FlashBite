import { RegisterRestauranteDto } from "../dtos/auth/register-restaurante";
import { RestauranteDto } from "../dtos/auth/restaurant.dto";
import { VerifyOTPDto } from "../dtos/auth/verify-otp.dtp.t";
import { CrearPlatoDto } from "../dtos/menu/create-plate.dto";
import { GetPlatesDto } from "../dtos/menu/get-plates";
import { MenuEntity } from "../entities/menu.entity";
import { RestauranteEntity } from "../entities/restaurante.entity";

export abstract class RestauranteDatasource {
    
    abstract findOne(email: string, emailValidado: boolean):Promise<RestauranteEntity | null>;
    abstract createRestaurante(dto:RegisterRestauranteDto):Promise<RestauranteEntity>;
    abstract validateEmail(dto:VerifyOTPDto):Promise<boolean>;
    abstract findAll():Promise<RestauranteEntity[]>;
    abstract createPlate(dto:CrearPlatoDto):Promise<MenuEntity>;
    abstract deletePate(namePlate:string,restaurante:string):Promise<MenuEntity>;
    abstract getTypes(id:RestauranteDto): Promise<MenuEntity[] | null>;
    abstract getPlates(dto: GetPlatesDto): Promise<MenuEntity[]>;

}
