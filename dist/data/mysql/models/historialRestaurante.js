"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistorialRestaurante = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../index");
const restaurante_models_1 = require("./restaurante.models");
// * Tabla historial restaurante 
exports.HistorialRestaurante = index_1.db.define('HistorialRestaurante', {
    id_historial: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
    },
    id_restaurante: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    id_usuario: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
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
restaurante_models_1.Restaurante.hasOne(exports.HistorialRestaurante, { foreignKey: 'id_restaurante', onDelete: 'CASCADE' });
exports.HistorialRestaurante.belongsTo(restaurante_models_1.Restaurante, { foreignKey: 'id_restaurante' });
