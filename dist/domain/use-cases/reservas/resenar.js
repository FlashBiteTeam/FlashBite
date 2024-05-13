"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resenar = void 0;
class Resenar {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto) {
        return this.repository.resenar(dto);
    }
}
exports.Resenar = Resenar;
