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
exports.OTPVerify = void 0;
const bcrypt_adapter_1 = require("../../../config/bcrypt.adapter");
const custom_errors_1 = require("../../errors/custom.errors");
class OTPVerify {
    constructor(repository) {
        this.repository = repository;
    }
    execute(verifyOTPDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existOTP = yield this.repository.findOne(verifyOTPDto);
                if (!existOTP) {
                    const existRestauranteOTP = yield this.repository.findOneRestaurante(verifyOTPDto);
                    if (existRestauranteOTP) {
                        console.log(existRestauranteOTP);
                        const { expira, otp } = existRestauranteOTP;
                        console.log(expira, otp);
                        if (expira < Date.now()) {
                            throw custom_errors_1.CustomError.notFound('OTP has expired or not found. Request for a new one');
                        }
                        try {
                            const match = yield bcrypt_adapter_1.bcriptAdapter.compare(verifyOTPDto.otp, otp);
                            if (!match) {
                                return false;
                            }
                            else {
                                this.repository.deleteOneRestaurante(verifyOTPDto.email);
                                return true;
                            }
                        }
                        catch (error) {
                            throw custom_errors_1.CustomError.notFound('OTP does not match');
                        }
                    }
                    else {
                        return false;
                    }
                }
                else {
                    console.log(existOTP);
                    const { expira, otp } = existOTP;
                    console.log(expira, otp);
                    if (expira < Date.now()) {
                        throw custom_errors_1.CustomError.notFound('OTP has expired or not found. Request for a new one');
                    }
                    try {
                        const match = yield bcrypt_adapter_1.bcriptAdapter.compare(verifyOTPDto.otp, otp);
                        if (!match) {
                            return false;
                        }
                        else {
                            this.repository.deleteOne(verifyOTPDto.email);
                            return true;
                        }
                    }
                    catch (error) {
                        throw custom_errors_1.CustomError.notFound('OTP does not match');
                    }
                }
            }
            catch (error) {
                throw custom_errors_1.CustomError.badRequest('There was an error');
            }
        });
    }
}
exports.OTPVerify = OTPVerify;
