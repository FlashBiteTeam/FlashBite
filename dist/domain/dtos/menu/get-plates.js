"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPlatesDto = void 0;
const config_1 = require("../../../config");
class GetPlatesDto {
    constructor(id, type) {
        this.id = id;
        this.type = type;
    }
    static create(id, type) {
        if (id === ':id')
            return ['ID cannot be empty', undefined];
        if (type === ':type')
            return ['Type cannot be empty', undefined];
        if (!config_1.regularExps.email.test(id))
            return ['Email is not vaild', undefined];
        return [undefined, new GetPlatesDto(id, type)];
    }
}
exports.GetPlatesDto = GetPlatesDto;
