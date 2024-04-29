import { Sequelize } from "sequelize";
import { HistorialRestaurante } from "../../data/mysql/models/historialRestaurante";
import { Restaurante } from "../../data/mysql/models/restaurante.models";
import { RestauranteDatasource } from "../../domain/datasources/restaurante.datasource";
import { RegisterRestauranteDto } from "../../domain/dtos/auth/register-restaurante";
import { VerifyOTPDto } from "../../domain/dtos/auth/verify-otp.dtp.t";
import { RestauranteEntity } from "../../domain/entities/restaurante.entity";
import { CrearPlatoDto } from "../../domain/dtos/menu/create-plate.dto";
import { Menu } from "../../data/mysql/models/menu";
import { MenuEntity } from "../../domain/entities/menu.entity";
import { time } from "console";
import { RestauranteDto } from "../../domain/dtos/auth/restaurant.dto";
import { GetPlatesDto } from "../../domain/dtos/menu/get-plates";

interface RestauranteBusquedaEntity extends RestauranteEntity {
    calificacionPromedio: string;
}
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
            numero: dto.numero,
            tipoComida: dto.tipoComida
            
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
    async findAll(): Promise<RestauranteBusquedaEntity[]> {
        try {
            const restaurantes = await Restaurante.findAll();
            const restaurantesEntities: RestauranteBusquedaEntity[] = [];
    
            for (const restaurante of restaurantes) {
                const restauranteEntity = RestauranteEntity.fromObject(restaurante);
    
                const promedio = await HistorialRestaurante.findOne({
                    attributes: [[Sequelize.fn('AVG', Sequelize.col('calificacion')), 'promedio_calificacion']],
                    where: {
                        id_restaurante: restauranteEntity.email
                    }
                });
    
                const calificacionPromedio = promedio?.get('promedio_calificacion') || 0;
    
                const calificacionPromedioString = calificacionPromedio.toString();
    
                const restauranteConCalificacion: RestauranteBusquedaEntity = {
                    ...restauranteEntity,
                    calificacionPromedio: calificacionPromedioString
                };
    
                restaurantesEntities.push(restauranteConCalificacion);
            }
    
            return restaurantesEntities;
        } catch (error) {
            console.error('Error al obtener los promedios de calificación:', error);
            throw error;
        }
    }

    
    async createPlate(dto:CrearPlatoDto):Promise<MenuEntity>{
        try {

            const menuModel = {
                id_restaurante: dto.id_restaurante,
                tipo:dto.tipo,
                nombre_plato: dto.nombre_plato,
                precio: dto.precio,
                descripcion: dto.descripcion,
                
            };
            console.log(menuModel)
            const menu = await Menu.create(menuModel);

            return MenuEntity.fromObject(menu);

        } catch (error) {
            throw error;
        }
    }
  
    async deletePate(namePlate: string,restaurante:string): Promise<MenuEntity>{

        const menu = await Menu.findOne({
            where: {
                nombre_plato: namePlate
            }
        });

        if (!menu) {
            throw new Error(`No se encontró ningún plato con el nombre ${namePlate}`);
        }

        const menuEntity = MenuEntity.fromObject(menu);


        await Menu.destroy({
            where: {
                id_restaurante:restaurante,
                nombre_plato: namePlate
            }
        });
        return menuEntity;
    }

    async getTypes(id:RestauranteDto): Promise<MenuEntity[] | null>{
        
        
        const menu = await Menu.findAll({
            where: {
                id_restaurante:id.id
            }
        });

        return menu.map(plate => MenuEntity.fromObject(plate));
    }
    async getPlates(dto: GetPlatesDto): Promise<MenuEntity[]>{
        
        const menu = await Menu.findAll({
            where: {
                id_restaurante:dto.id,
                tipo: dto.type
            }
        });

        return menu.map(plate => MenuEntity.fromObject(plate));
    }

}