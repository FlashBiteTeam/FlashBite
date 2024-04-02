import { RestauranteDatasource } from "../../domain/datasources/restaurante.datasource";
import { RegisterRestauranteDto } from "../../domain/dtos/auth/register-restaurante";
import { VerifyOTPDto } from "../../domain/dtos/auth/verify-otp.dtp.t";
import { RestauranteEntity } from "../../domain/entities/restaurante.entity";
import { RestauranteRepository } from "../../domain/repository/restaurante.repository";

export class RestauranteRepositoryImpl implements RestauranteRepository{
    constructor(
        private readonly restauranteDatasource:RestauranteDatasource
    ){}
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
}