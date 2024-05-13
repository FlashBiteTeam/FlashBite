"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaRepositoryImpl = void 0;
class ReservaRepositoryImpl {
    constructor(reservaDatasource) {
        this.reservaDatasource = reservaDatasource;
    }
    getUserHistorial(dto) {
        return this.reservaDatasource.getUserHistorial(dto);
    }
    getRestauranteHistorial(dto) {
        return this.reservaDatasource.getRestauranteHistorial(dto);
    }
    resenar(dto) {
        return this.reservaDatasource.resenar(dto);
    }
    getAgreed(dto) {
        return this.reservaDatasource.getAgreed(dto);
    }
    setStateToTwo(dto) {
        return this.reservaDatasource.setStateToTwo(dto);
    }
    createReserva(dto) {
        return this.reservaDatasource.createReserva(dto);
    }
    findCurrentByRestaurant(dto) {
        return this.reservaDatasource.findCurrentByRestaurant(dto);
    }
    findCurrentByUser(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.reservaDatasource.findCurrentByUser(dto);
        });
    }
    finishReservation(dto) {
        return this.reservaDatasource.finishReservation(dto);
    }
}
exports.ReservaRepositoryImpl = ReservaRepositoryImpl;
