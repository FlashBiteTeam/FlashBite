"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPrestaurante = exports.Restaurante = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../index");
// * Tabla usuario 
exports.Restaurante = index_1.db.define('restaurante', {
    email: {
        primaryKey: true,
        type: sequelize_1.DataTypes.STRING,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    nit: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    permiso: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
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
    },
    tipoComida: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
});
exports.OTPrestaurante = index_1.db.define('OTPrestaurante', {
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
;
exports.Restaurante.hasOne(exports.OTPrestaurante, { foreignKey: 'email', onDelete: 'CASCADE' });
exports.OTPrestaurante.belongsTo(exports.Restaurante, { foreignKey: 'email' });
