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
exports.MongoOTPDatasource = void 0;
const data_1 = require("../../data");
const restaurante_models_1 = require("../../data/mysql/models/restaurante.models");
const domain_1 = require("../../domain");
class MongoOTPDatasource {
    saveOTP(otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const mappedOTP = {
                email: otp.email,
                otp: otp.otp,
                creado: otp.creado,
                expira: otp.expira
            };
            const newOTP = yield data_1.OTP.create(mappedOTP);
            console.log('Mongo OTP created:', newOTP);
        });
    }
    saveOTPRestaurante(otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const mappedOTP = {
                email: otp.email,
                otp: otp.otp,
                creado: otp.creado,
                expira: otp.expira
            };
            const newOTP = yield restaurante_models_1.OTPrestaurante.create(mappedOTP);
            console.log('Mongo OTP created:', newOTP);
        });
    }
    deleteOne(email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield data_1.OTP.destroy({
                where: {
                    email: email
                }
            });
        });
    }
    deleteOneRestaurante(email) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("PASOO por el repo");
            yield restaurante_models_1.OTPrestaurante.destroy({
                where: {
                    email: email
                }
            });
        });
    }
    findOne(verifyOTPDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = verifyOTPDto;
            try {
                const foundOTP = yield data_1.OTP.findOne({
                    where: { email: email }
                });
                if (foundOTP) {
                    return domain_1.OTPEntity.fromObject(foundOTP.toJSON());
                }
                else {
                    console.log("No se encontró ningún OTP con el email proporcionado.");
                    return null;
                }
            }
            catch (error) {
                console.error("Error al buscar OTP:", error);
                return null;
            }
        });
    }
    findOneRestaurante(verifyOTPDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = verifyOTPDto;
            try {
                const foundOTP = yield restaurante_models_1.OTPrestaurante.findOne({
                    where: { email: email }
                });
                if (foundOTP) {
                    return domain_1.OTPEntity.fromObject(foundOTP.toJSON());
                }
                else {
                    console.log("No se encontró ningún OTP con el email proporcionado.");
                    return null;
                }
            }
            catch (error) {
                console.error("Error al buscar OTP:", error);
                return null;
            }
        });
    }
}
exports.MongoOTPDatasource = MongoOTPDatasource;
