
import { DataTypes } from 'sequelize';
import { db} from '../../index';

// * tabla tipo

export const UsuarioTipo = db.define('usuario_tipo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rolUsuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
},{
    timestamps: false,
    tableName: 'usuario_tipo' 
});

// * Tabla usuario 

export const Usuario = db.define('usuario', {
    email: {
        primaryKey:  true,
        type: DataTypes.STRING,
        
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
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
export const OTP = db.define('OTP',{
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
UsuarioTipo.hasMany(Usuario);
Usuario.belongsTo(UsuarioTipo);

Usuario.hasOne(OTP, { foreignKey: 'email', onDelete: 'CASCADE' });
OTP.belongsTo(Usuario, { foreignKey: 'email' });

