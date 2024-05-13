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
exports.OTPRegister = void 0;
const domain_1 = require("../../../domain");
const custom_errors_1 = require("../../errors/custom.errors");
class OTPRegister {
    constructor(repository) {
        this.repository = repository;
    }
    execute(dto, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = dto;
                const otpNumber = `${Math.floor(1000 + Math.random() * 90000)}`;
                const OTP = new domain_1.OTPEntity({
                    otp: otpNumber,
                    email: email,
                    creado: Date.now(),
                    expira: Date.now() + 3600000 * +duration,
                });
                yield this.repository.deleteOne(dto.email);
                return OTP;
            }
            catch (error) {
                throw custom_errors_1.CustomError.badRequest('There was an error');
            }
        });
    }
}
exports.OTPRegister = OTPRegister;
