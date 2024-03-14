
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
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
   
    emailValidado: {
        type: DataTypes.BOOLEAN,
        allowNull: false 
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

UsuarioTipo.hasMany(Usuario);
Usuario.belongsTo(UsuarioTipo);