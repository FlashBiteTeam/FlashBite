
import { DataTypes } from 'sequelize';
import { OTP, Usuario, db} from '../../index';
import { Restaurante } from './restaurante.models';

// * Tabla historial restaurante 
export const Menu = db.define('MenuRestaurante', {
     id_Menu: {
        primaryKey:  true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        
    },
    id_restaurante:{
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre_plato:{
        type: DataTypes.STRING,
        allowNull: false
    },
    precio:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: true,
    },
   
});


Restaurante.hasOne(Menu, { foreignKey: 'id_restaurante', onDelete: 'CASCADE' });
Menu.belongsTo(Restaurante, { foreignKey: 'id_restaurante' });
