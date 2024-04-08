
import { DataTypes } from 'sequelize';
import { OTP, Usuario, db} from '../../index';
import { Restaurante } from './restaurante.models';

// * Tabla historial restaurante 
export const HistorialRestaurante = db.define('HistorialRestaurante', {
     id_historial: {
        primaryKey:  true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        
    },
    id_restaurante:{
        type: DataTypes.STRING,
        allowNull: false
    },
    id_usuario:{
        type: DataTypes.STRING,
        allowNull: false
    },
    comentario:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    calificacion:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    hora:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha:{
        type: DataTypes.STRING,
        allowNull: false,
      },
});


Restaurante.hasOne(HistorialRestaurante, { foreignKey: 'id_restaurante', onDelete: 'CASCADE' });
HistorialRestaurante.belongsTo(Restaurante, { foreignKey: 'id_restaurante' });
