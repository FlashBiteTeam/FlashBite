
import { DataTypes } from 'sequelize';
import { db} from '../../index';

// * Tabla usuario 

export const Restaurante = db.define('restaurante', {
    email: {
        primaryKey:  true,
        type: DataTypes.STRING,
        
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccion:{
        type: DataTypes.STRING,
        allowNull: false
    },
    nit:{
        type: DataTypes.STRING,
        allowNull: false
    },
    permiso:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    emailValidado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false 
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
