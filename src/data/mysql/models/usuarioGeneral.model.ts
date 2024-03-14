import { DataTypes } from 'sequelize';
import { db } from '../../index';

export const UsuarioGeneral = db.define('usuario_general', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rolUsuario: {
        type: DataTypes.STRING,
        allowNull: false
    }
});