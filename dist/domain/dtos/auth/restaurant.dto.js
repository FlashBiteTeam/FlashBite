"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestauranteDto = void 0;
const config_1 = require("../../../config");
class RestauranteDto {
    constructor(id) {
        this.id = id;
    }
    static create(id) {
        if (id === ':id')
            return ['ID cannot be empty', undefined];
        if (!config_1.regularExps.email.test(id))
            return ['Email is not vaild', undefined];
        return [undefined, new RestauranteDto(id)];
    }
}
exports.RestauranteDto = RestauranteDto;
