"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestauranteRepositoryImpl = void 0;
class RestauranteRepositoryImpl {
    constructor(restauranteDatasource) {
        this.restauranteDatasource = restauranteDatasource;
    }
    getPlates(dto) {
        return this.restauranteDatasource.getPlates(dto);
    }
    deletePate(namePlate, restaurante) {
        return this.restauranteDatasource.deletePate(namePlate, restaurante);
    }
    createPlate(dto) {
        return this.restauranteDatasource.createPlate(dto);
    }
    findOne(email, emailValidado) {
        return this.restauranteDatasource.findOne(email, emailValidado);
    }
    createRestaurante(dto) {
        return this.restauranteDatasource.createRestaurante(dto);
    }
    validateEmail(dto) {
        return this.restauranteDatasource.validateEmail(dto);
    }
    findAll() {
        return this.restauranteDatasource.findAll();
    }
    getTypes(id) {
        return this.restauranteDatasource.getTypes(id);
    }
}
exports.RestauranteRepositoryImpl = RestauranteRepositoryImpl;
