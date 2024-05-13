"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
const config_1 = require("../../../config");
class UserDto {
    constructor(id) {
        this.id = id;
    }
    static create(id) {
        if (id === ':id')
            return ['ID cannot be empty', undefined];
        if (!config_1.regularExps.email.test(id))
            return ['Email is not vaild', undefined];
        return [undefined, new UserDto(id)];
    }
}
exports.UserDto = UserDto;
