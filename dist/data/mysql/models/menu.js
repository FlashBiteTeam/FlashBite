"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../index");
const restaurante_models_1 = require("./restaurante.models");
// * Tabla historial restaurante 
exports.Menu = index_1.db.define('MenuRestaurante', {
    id_Menu: {
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
    },
    id_restaurante: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    nombre_plato: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
});
restaurante_models_1.Restaurante.hasOne(exports.Menu, { foreignKey: 'id_restaurante', onDelete: 'CASCADE' });
exports.Menu.belongsTo(restaurante_models_1.Restaurante, { foreignKey: 'id_restaurante' });
