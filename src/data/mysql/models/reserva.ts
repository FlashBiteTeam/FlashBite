import { DataTypes } from "sequelize";
import { db } from "../mysql-database";
import { Usuario } from "./usuarios.model";
import { Restaurante } from "./restaurante.models";

export const Reserva = db.define('Reserva', {
    id_reserva: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_restaurante: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    hora:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha:{
      type: DataTypes.STRING,
      allowNull: false,
    }
});
Reserva.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Usuario.belongsToMany(Restaurante, { through: Reserva, foreignKey: 'id_usuario' });
Restaurante.belongsToMany(Usuario, { through: Reserva, foreignKey: 'id_restaurante' });