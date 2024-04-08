
import { ResenaDto } from "../../dtos/reservas/resena.dto";
import { CrearReservaDto } from "../../dtos/reservas/reserva-crear.dto";
import { ReservaEntity } from "../../entities/reserva.entity";
import { ReservaRepository } from "../../repository/reserva.repository";

export interface ResenarUseCase{
    execute(dto:ResenaDto):Promise<String>
}

export class Resenar implements ResenarUseCase{

    constructor(
        private readonly repository: ReservaRepository,
    ){}
    execute(dto: ResenaDto): Promise<String> {
        return this.repository.resenar(dto);
    }

}