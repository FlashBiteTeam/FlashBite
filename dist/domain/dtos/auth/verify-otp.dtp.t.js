"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyOTPDto = void 0;
class VerifyOTPDto {
    constructor(email, otp) {
        this.email = email;
        this.otp = otp;
    }
    static create(object) {
        const { email, otp } = object;
        if (!email)
            return ['Missing email', undefined];
        if (!otp)
            return ['Missing OTP', undefined];
        return [undefined, new VerifyOTPDto(email, otp)];
    }
}
exports.VerifyOTPDto = VerifyOTPDto;
