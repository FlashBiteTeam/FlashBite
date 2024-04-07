import { Usuario } from "../../data";
import { Reserva } from "../../data/mysql/models/reserva";
import { Restaurante } from "../../data/mysql/models/restaurante.models";
import { UsuarioEntity } from "../../domain";
import { ReservaDatasource } from "../../domain/datasources/reserva.datasource";
import { CrearReservaDto } from "../../domain/dtos/auth/reserva-crear.dto";
import { RestauranteDto } from "../../domain/dtos/auth/restaurant.dto";
import { ReservaEntity } from "../../domain/entities/reserva.entity";
import { RestauranteEntity } from "../../domain/entities/restaurante.entity";
import { CustomError } from "../../domain/errors/custom.errors";

export class MysqlReservaDatasource implements ReservaDatasource{

  async createReserva(dto: CrearReservaDto): Promise<ReservaEntity> {
    try {
        // Buscar el usuario y el restaurante
        const usuario = await Usuario.findByPk(dto.usuario);
        const restaurante = await Restaurante.findByPk(dto.restaurante);

        // Verificar si el usuario y el restaurante existen
        if (!usuario || !restaurante) {
            throw CustomError.badRequest('Usuario o Restaurante no encontrado');
        }

        // Crear instancias de UsuarioEntity y RestauranteEntity
        const usuarioEntity = UsuarioEntity.fromObject(usuario!);
        const restauranteEntity = RestauranteEntity.fromObject(restaurante!);

        // Verificar si ya existe una reserva con el mismo usuario y restaurante ID
        const existingReserva = await Reserva.findOne({
            where: {
                id_usuario: usuarioEntity.email,
                id_restaurante: restauranteEntity.email
            }
        });

        // Si ya existe una reserva, lanzar un error
        if (existingReserva) {
             throw CustomError.badRequest('Ya existe una reserva para este usuario y restaurante');
        }

        // Crear la reserva
        const reserva = await Reserva.create({
            id_usuario: usuarioEntity.email,
            id_restaurante: restauranteEntity.email,
            hora: dto.hora,
            fecha: dto.fecha
        });

        // Convertir la reserva a una instancia de ReservaEntity
        const reservaResult = ReservaEntity.fromObject(reserva);

        return reservaResult;
    } catch (error) {
        // Manejar cualquier error lanzado durante el proceso
       throw (error);
    }
}

async findCurrentByRestaurant(dto: RestauranteDto): Promise<ReservaEntity[]> {
    try {
        const reservas = await Reserva.findAll({
            where: {
                id_restaurante: dto.id
            }
        });
        if (reservas.length === 0) {
            throw CustomError.badRequest("No Hay reservas en el momento");
        }
        return reservas.map(reserva => ReservaEntity.fromObject(reserva));
    } catch (error) {
        
        throw (error);
    }
}
}