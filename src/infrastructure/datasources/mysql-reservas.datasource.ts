import { Usuario } from "../../data";
import { HistorialRestaurante } from "../../data/mysql/models/historialRestaurante";
import { HistorialUsuario } from "../../data/mysql/models/historialUsuarios";
import { Reserva } from "../../data/mysql/models/reserva";
import { Restaurante } from "../../data/mysql/models/restaurante.models";
import { UsuarioEntity } from "../../domain";
import { ReservaDatasource } from "../../domain/datasources/reserva.datasource";
import { AgreeReservationDto } from "../../domain/dtos/reservas/agree-reservation.dto";
import { FinishReservationDto } from "../../domain/dtos/reservas/finish-reservation.dto";
import { CrearReservaDto } from "../../domain/dtos/reservas/reserva-crear.dto";
import { RestauranteDto } from "../../domain/dtos/auth/restaurant.dto";
import { HistorialEntity } from "../../domain/entities/historial.entity";
import { ReservaEntity } from "../../domain/entities/reserva.entity";
import { RestauranteEntity } from "../../domain/entities/restaurante.entity";
import { CustomError } from "../../domain/errors/custom.errors";
import { ResenaDto } from "../../domain/dtos/reservas/resena.dto";
import { UserDto } from "../../domain/dtos/auth/user.dto";

export class MysqlReservaDatasource implements ReservaDatasource{
    
    async getUserHistorial(dto: UserDto): Promise<HistorialEntity[]> {
        try {
            const historial = await HistorialUsuario.findAll({
                where: {
                    id_usuario: dto.id
                }
            });
            if (historial.length === 0) {
                throw CustomError.badRequest("No Hay reservas en el historial del Usuario");
            }
            return historial.map(element => HistorialEntity.fromObject(element));
        } catch (error) {
            
            throw (error);
        }
    }
    async getRestauranteHistorial(dto: RestauranteDto): Promise<HistorialEntity[]> {
        try {
            const historial = await HistorialRestaurante.findAll({
                where: {
                    id_restaurante: dto.id
                }
            })
            if (historial.length === 0) {
                throw CustomError.badRequest("No Hay reservas en el historial del Usuario");
            }
            return historial.map(element => HistorialEntity.fromObject(element));
        } catch (error) {
            
            throw (error);
        }
    }    

    async resenar(dto: ResenaDto): Promise<String> {

        try {
            console.log(dto)
            await HistorialUsuario.update(
                {...dto,
                estado: '2'
                }, 
                { where: { id_usuario: dto.emailUsuario, id_restaurante: dto.emailRestaurante, hora:dto.hora , fecha: dto.fecha } } 
            );
            await HistorialRestaurante.update(
                {...dto}, 
                { where: { id_usuario: dto.emailUsuario, id_restaurante: dto.emailRestaurante, hora:dto.hora , fecha: dto.fecha } } 
            );

            return 'Reseña realizada'
        } catch (error) {
            throw(error)
        }

    }

   async getAgreed(dto: RestauranteDto): Promise<ReservaEntity[]> {
        try {
            const reservas = await Reserva.findAll({
                where: {
                    id_restaurante: dto.id,
                    estado: '2',
                }
            });
            if (reservas.length === 0) {
                throw CustomError.badRequest("No Hay reservas acordadas en el momento");
            }
            return reservas.map(reserva => ReservaEntity.fromObject(reserva));
        } catch (error) {
            
            throw (error);
        }
    }
    async setStateToTwo(dto: AgreeReservationDto): Promise<ReservaEntity> {
        try {
            const reserva = await Reserva.findOne({
                where: {
                    id_usuario: dto.emailUsuario,
                    id_restaurante: dto.emailRestaurante
                }
            });

            if (!reserva) {
                throw CustomError.notFound('Reserva no encontrada');
            }

            await Reserva.update(
                { estado: '2' }, 
                { where: { id_usuario: dto.emailUsuario, id_restaurante: dto.emailRestaurante } } 
            );
            const reservaActualizada = await Reserva.findOne({
                where: {
                    id_usuario: dto.emailUsuario,
                    id_restaurante: dto.emailRestaurante
                }
            });

            const reservaActualizadaEntity = ReservaEntity.fromObject(reservaActualizada!);

            return reservaActualizadaEntity;
        } catch (error) {
            throw (error);
        }
    }

  async createReserva(dto: CrearReservaDto): Promise<ReservaEntity> {
    try {
        const usuario = await Usuario.findByPk(dto.usuario);
        const restaurante = await Restaurante.findByPk(dto.restaurante);

        if (!usuario || !restaurante) {
            throw CustomError.badRequest('Usuario o Restaurante no encontrado');
        }

        const usuarioEntity = UsuarioEntity.fromObject(usuario!);
        const restauranteEntity = RestauranteEntity.fromObject(restaurante!);

        const existingReserva = await Reserva.findOne({
            where: {
                id_usuario: usuarioEntity.email,
                id_restaurante: restauranteEntity.email
            }
        });

        if (existingReserva) {
             throw CustomError.badRequest('Ya existe una reserva para este usuario y restaurante');
        }

        const reserva = await Reserva.create({
            id_usuario: usuarioEntity.email,
            id_restaurante: restauranteEntity.email,
            hora: dto.hora,
            fecha: dto.fecha
        });

        const reservaResult = ReservaEntity.fromObject(reserva);

        return reservaResult;
    } catch (error) {
       throw (error);
    }
}
async findCurrentByUser(dto: UserDto): Promise<ReservaEntity[]> {
    try {
        const reservas = await Reserva.findAll({
            where: {
                id_usuario: dto.id
            }
        });
        if (reservas.length === 0) {
            throw CustomError.badRequest("No Hay reservas en el momento para el usuario");
        }
        return reservas.map(reserva => ReservaEntity.fromObject(reserva));
    } catch (error) {
        
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
async finishReservation(dto: FinishReservationDto): Promise<String> {
    try {
        let foundReserva = await Reserva.findOne({
            where: {
                id_usuario: dto.emailUsuario,
                id_restaurante: dto.emailRestaurante
            }
        });
        console.log(foundReserva)
        const reservas = await Reserva.destroy({
            where: {
                id_restaurante: dto.emailRestaurante,
                id_usuario: dto.emailUsuario,
                estado: '2'
            }
        });
        const ReservaHistorial = HistorialEntity.fromObject(foundReserva!);
        const historialUsuario = await HistorialUsuario.create({...ReservaHistorial,estado:'1'});
        const historialRestaurante = await HistorialRestaurante.create({...ReservaHistorial,estado:'1'});
        return 'Reservación finalizada y pendiente por realimentación';
    } catch (error) {
        
        throw (error);
    }
}
}