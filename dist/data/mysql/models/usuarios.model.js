"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTP = exports.Usuario = exports.UsuarioTipo = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../index");
// * tabla tipo
exports.UsuarioTipo = index_1.db.define('usuario_tipo', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rolUsuario: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: false,
    tableName: 'usuario_tipo'
});
// * Tabla usuario 
exports.Usuario = index_1.db.define('usuario', {
    email: {
        primaryKey: true,
        type: sequelize_1.DataTypes.STRING,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    emailValidado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    contrasena: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    numero: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
exports.OTP = index_1.db.define('OTP', {
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    otp: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    creado: {
        type: sequelize_1.DataTypes.DATE
    },
    expira: {
        type: sequelize_1.DataTypes.DATE
    }
});
exports.UsuarioTipo.hasMany(exports.Usuario);
exports.Usuario.belongsTo(exports.UsuarioTipo);
exports.Usuario.hasOne(exports.OTP, { foreignKey: 'email', onDelete: 'CASCADE' });
exports.OTP.belongsTo(exports.Usuario, { foreignKey: 'email' });
