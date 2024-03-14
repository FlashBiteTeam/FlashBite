import { DataTypes } from 'sequelize';
import { db } from '../../index';

export const Usuario = db.define('usuario', {
    email: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emailValidado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    otp: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
});