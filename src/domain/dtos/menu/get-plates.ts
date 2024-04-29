import { regularExps } from "../../../config";

export class GetPlatesDto{
    constructor(
        public readonly id:string,
        public readonly type:string,
        
    ){}
    static create(id:string,type:string):[string?,GetPlatesDto?]{

        if (id === ':id') return ['ID cannot be empty', undefined];
        if (type === ':type') return ['Type cannot be empty', undefined];
        if(!regularExps.email.test(id)) return ['Email is not vaild', undefined];
        
        return [undefined, new GetPlatesDto(id,type)]

    }
}