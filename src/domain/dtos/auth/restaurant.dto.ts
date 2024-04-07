import { regularExps } from "../../../config";

export class RestauranteDto{
    constructor(
        public readonly id:string,
        
    ){}
    static create(id:string):[string?,RestauranteDto?]{

        if (id === ':id') return ['ID cannot be empty', undefined];
        if(!regularExps.email.test(id)) return ['Email is not vaild', undefined];
        
        return [undefined, new RestauranteDto(id)]

    }
}