"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryImpl = void 0;
class UserRepositoryImpl {
    constructor(userDatasource) {
        this.userDatasource = userDatasource;
    }
    validateEmail(dto) {
        return this, this.userDatasource.validateEmail(dto);
    }
    findOne(email, emailValidado) {
        return this.userDatasource.findOne(email, emailValidado);
    }
    createUser(dto) {
        return this.userDatasource.createUser(dto);
    }
}
exports.UserRepositoryImpl = UserRepositoryImpl;
