
import { DataTypes } from 'sequelize';
import { OTP, db} from '../../index';

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

export const OTPrestaurante = db.define('OTPrestaurante',{
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    otp:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    creado:{
        type: DataTypes.DATE
    },
    expira:{
        type: DataTypes.DATE
    }
});
;

Restaurante.hasOne(OTPrestaurante, { foreignKey: 'email', onDelete: 'CASCADE' });
OTPrestaurante.belongsTo(Restaurante, { foreignKey: 'email' });
