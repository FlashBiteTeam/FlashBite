import { Restaurante } from "../../data/mysql/models/restaurante.models";
import { RestauranteDatasource } from "../../domain/datasources/restaurante.datasource";
import { RegisterRestauranteDto } from "../../domain/dtos/auth/register-restaurante";
import { VerifyOTPDto } from "../../domain/dtos/auth/verify-otp.dtp.t";
import { RestauranteEntity } from "../../domain/entities/restaurante.entity";

export class MysqlRestauranteDatasource implements RestauranteDatasource{
    async findOne(email: string, emailValidado: boolean): Promise<RestauranteEntity | null> {
        const restaurante = await Restaurante.findOne({ where: {email: email,emailValidado: emailValidado}});
        if(restaurante) return RestauranteEntity.fromObject(restaurante);
        return null;
    }
    async createRestaurante(dto: RegisterRestauranteDto): Promise<RestauranteEntity> {
        console.log(dto, 'CREATED Restaurante')
        const restauranteModel = {

            nombre: dto.nombre,
            direccion:dto.direccion,
            email: dto.email,
            nit: dto.nit,
            contrasena: dto.contrasena,
            numero: dto.numero
            
        };
        const user = await Restaurante.create(restauranteModel);
        return RestauranteEntity.fromObject(user);

    }
    async validateEmail(dto:VerifyOTPDto):Promise<boolean>{
        const { email } = dto;
        const user = await Restaurante.update(
            { emailValidado: true },
            { 
                where: { email }, 
                returning: true 
            }
        );
        if (user) {
            console.log(`Email validado para el usuario con email ${email}.`);
            return true;
        } else {
            console.log(`No se pudo validar el email para el usuario con email ${email}.`);
            return false;
        }
    }
    
}