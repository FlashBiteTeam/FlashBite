"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrearReserva = void 0;
class CrearReserva {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.createReserva(dto);
    }
}
exports.CrearReserva = CrearReserva;
