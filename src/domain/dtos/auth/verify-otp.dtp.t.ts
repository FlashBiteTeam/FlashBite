export class VerifyOTPDto{
    constructor(
        public readonly email:string,
        public readonly otp:string,
    ){}
    static create(object: {[key:string]:any}):[string?,VerifyOTPDto?]{
        const {email, otp} = object;

        
        if(!email) return['Missing email', undefined];

        if(!otp) return['Missing OTP', undefined];


        return [undefined, new VerifyOTPDto(email,otp)]

    }
}