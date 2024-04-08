
import { DataTypes } from 'sequelize';
import { OTP, Usuario, db} from '../../index';

// * Tabla historial usuario 
export const HistorialUsuario = db.define('HistorialUsuario', {
     id_historial: {
        primaryKey:  true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: true,
        
    },
    id_restaurante:{
        type: DataTypes.STRING,
        allowNull: false
    },
    id_usuario:{
        type: DataTypes.STRING,
        allowNull: false
    },
    estado:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue: '1',
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


Usuario.hasOne(HistorialUsuario, { foreignKey: 'id_usuario', onDelete: 'CASCADE' });
HistorialUsuario.belongsTo(Usuario, { foreignKey: 'id_usuario' });
