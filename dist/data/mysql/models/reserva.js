"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reserva = void 0;
const sequelize_1 = require("sequelize");
const mysql_database_1 = require("../mysql-database");
const usuarios_model_1 = require("./usuarios.model");
const restaurante_models_1 = require("./restaurante.models");
exports.Reserva = mysql_database_1.db.define('Reserva', {
    id_reserva: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_usuario: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    id_restaurante: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    hora: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fecha: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: '1',
    }
});
exports.Reserva.belongsTo(usuarios_model_1.Usuario, { foreignKey: 'id_usuario' });
usuarios_model_1.Usuario.belongsToMany(restaurante_models_1.Restaurante, { through: exports.Reserva, foreignKey: 'id_usuario' });
restaurante_models_1.Restaurante.belongsToMany(usuarios_model_1.Usuario, { through: exports.Reserva, foreignKey: 'id_restaurante' });
