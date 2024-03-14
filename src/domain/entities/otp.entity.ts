
export interface OTPEntityOptions{
    email: string;
    subject: string;
    message: string;
    duration: number;
}



export class OTPEntity {

    public message: string;
    public email: string;
    public subject: string;
    public duration: number;

    constructor(options:OTPEntityOptions){
        const {message = '', email, subject = '', duration = 1} = options;

        this.message = message;
        this.email = email;
        this.subject = subject;
        this.duration = duration;
        
    }

    static fromJson = (json:string):OTPEntity =>{

        json = (json=== '') ? '{}': json;
        const {message, email, subject, duration} = JSON.parse(json);
        const OTP = new OTPEntity({
            message,
            email,
            subject,
            duration});
        return OTP;

    }

    static fromObject = (object: {[key:string]:any}):OTPEntity=>{
        const {message, email, subject, duration}= object;
        const OTP = new OTPEntity({
            message, email, subject, duration
        })
        return OTP
    }
}