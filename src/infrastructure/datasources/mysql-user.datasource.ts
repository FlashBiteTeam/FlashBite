import { UsuarioEntity, RegisterUserDto } from "../../domain";
import { UserDatasource } from "../../domain/datasources/user.datasource";
import {Usuario} from "../../data/mysql/models/usuarios.model";

export class MysqlUserDatasource implements UserDatasource{
    async findOne(email: string): Promise<UsuarioEntity | null> {
        const usuario = await Usuario.findOne({ where: { email } });
        if(usuario) return UsuarioEntity.fromObject(usuario);
        return null;

    }
    async createUser(dto: RegisterUserDto): Promise<UsuarioEntity> {
        console.log(dto, 'CREATE USER')
        const usuarioModel = {
            email:dto.email,
            nombre: dto.nombre,
            contrasena: dto.contraseña,
            numero: dto.numero,
            
        };
        const user = await Usuario.create(usuarioModel);
        return UsuarioEntity.fromObject(user)

    }

}