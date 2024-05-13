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
exports.OTPRepositoryImpl = void 0;
class OTPRepositoryImpl {
    constructor(otpDatasource) {
        this.otpDatasource = otpDatasource;
    }
    saveOTP(otp) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.otpDatasource.saveOTP(otp);
        });
    }
    deleteOne(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.otpDatasource.deleteOne(email);
        });
    }
    findOne(verifyOTPDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.otpDatasource.findOne(verifyOTPDto);
        });
    }
    saveOTPRestaurante(otp) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.otpDatasource.saveOTPRestaurante(otp);
        });
    }
    deleteOneRestaurante(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.otpDatasource.deleteOneRestaurante(email);
        });
    }
    findOneRestaurante(verifyOTPDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.otpDatasource.findOneRestaurante(verifyOTPDto);
        });
    }
}
exports.OTPRepositoryImpl = OTPRepositoryImpl;
