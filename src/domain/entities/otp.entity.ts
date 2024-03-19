
export interface OTPEntityOptions{
    otp: string;
    email: string;
    creado: number;
    expira: number;
}



export class OTPEntity {

    public otp: string;
    public email: string;
    public creado: number;
    public expira: number;

    constructor(options:OTPEntityOptions){
        const {otp, email,creado , expira} = options;

        this.otp = otp;
        this.email = email;
        this.creado = creado;
        this.expira = expira;
        
    }

    static fromJson = (json:string):OTPEntity =>{

        json = (json=== '') ? '{}': json;
        const {otp, email, creado, expira} = JSON.parse(json);
        const OTP = new OTPEntity({
            otp,
            email,
            creado,
            expira});
        return OTP;

    }

    static fromObject = (object: {[key:string]:any}):OTPEntity=>{
        const {otp, email, creado, expira}= object;
        const OTP = new OTPEntity({
            otp, email, creado, expira
        })
        return OTP
    }
}