"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistorialUsuario = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../index");
// * Tabla historial usuario 
exports.HistorialUsuario = index_1.db.define('HistorialUsuario', {
    id_historial: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: true,
    },
    id_restaurante: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    id_usuario: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: '1',
    },
    comentario: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    calificacion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    hora: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fecha: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
index_1.Usuario.hasOne(exports.HistorialUsuario, { foreignKey: 'id_usuario', onDelete: 'CASCADE' });
exports.HistorialUsuario.belongsTo(index_1.Usuario, { foreignKey: 'id_usuario' });
