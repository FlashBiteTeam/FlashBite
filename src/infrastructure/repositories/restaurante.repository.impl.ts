import { RestauranteDatasource } from "../../domain/datasources/restaurante.datasource";
import { RegisterRestauranteDto } from "../../domain/dtos/auth/register-restaurante";
import { RestauranteDto } from "../../domain/dtos/auth/restaurant.dto";
import { VerifyOTPDto } from "../../domain/dtos/auth/verify-otp.dtp.t";
import { CrearPlatoDto } from "../../domain/dtos/menu/create-plate.dto";
import { GetPlatesDto } from "../../domain/dtos/menu/get-plates";
import { MenuEntity } from "../../domain/entities/menu.entity";
import { RestauranteEntity } from "../../domain/entities/restaurante.entity";
import { RestauranteRepository } from "../../domain/repository/restaurante.repository";

export class RestauranteRepositoryImpl implements RestauranteRepository{
    constructor(
        private readonly restauranteDatasource:RestauranteDatasource
    ){}
    getPlates(dto: GetPlatesDto): Promise<MenuEntity[]> {
        return this.restauranteDatasource.getPlates(dto);
    }
    deletePate(namePlate: string,restaurante:string): Promise<MenuEntity> {
        return this.restauranteDatasource.deletePate(namePlate,restaurante);
    }
    createPlate(dto: CrearPlatoDto): Promise<MenuEntity> {
        return this.restauranteDatasource.createPlate(dto);
    }
    findOne(email: string, emailValidado: boolean): Promise<RestauranteEntity | null> {
        return this.restauranteDatasource.findOne(email,emailValidado);
    }
    createRestaurante(dto: RegisterRestauranteDto): Promise<RestauranteEntity> {
        return this.restauranteDatasource.createRestaurante(dto);
    }
    validateEmail(dto: VerifyOTPDto): Promise<boolean> {
        return this.restauranteDatasource.validateEmail(dto);
    }
    findAll(): Promise<RestauranteEntity[]> {
        return this.restauranteDatasource.findAll();
    }
    getTypes(id:RestauranteDto): Promise<MenuEntity[] | null>{
        return this.restauranteDatasource.getTypes(id);
    }

}