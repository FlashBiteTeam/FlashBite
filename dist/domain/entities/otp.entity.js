"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPEntity = void 0;
class OTPEntity {
    constructor(options) {
        const { otp, email, creado, expira } = options;
        this.otp = otp;
        this.email = email;
        this.creado = creado;
        this.expira = expira;
    }
}
exports.OTPEntity = OTPEntity;
OTPEntity.fromJson = (json) => {
    json = (json === '') ? '{}' : json;
    const { otp, email, creado, expira } = JSON.parse(json);
    const OTP = new OTPEntity({
        otp,
        email,
        creado,
        expira
    });
    return OTP;
};
OTPEntity.fromObject = (object) => {
    const { otp, email, creado, expira } = object;
    const OTP = new OTPEntity({
        otp, email, creado, expira
    });
    return OTP;
};
