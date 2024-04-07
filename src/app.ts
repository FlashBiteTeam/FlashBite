import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";
import {envs} from './config/envs';
import { Usuario, dbConnection  } from "./data";
import { Restaurante } from "./data/mysql/models/restaurante.models";
import { Reserva } from "./data/mysql/models/reserva";
import { UsuarioEntity } from "./domain";
import { RestauranteEntity } from "./domain/entities/restaurante.entity";



(()=>{
    main();
})()

async function main(){
    const serverExpress = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes    
    })

    serverExpress.start();
    console.log(envs.MYSQL_HOST,envs.MYSQL_ROOT_PASSWORD, envs.MYSQL_PORT);
    
    
   

    await dbConnection();

    const usuario = await Usuario.findByPk('andresitop07785@gmail.com');
    const restaurante = await Restaurante.findByPk('seviw76654@centerf.com');

    if (!usuario || !restaurante) {
      throw new Error('Usuario o Restaurante no encontrado');
    }

   
    const user = UsuarioEntity.fromObject(usuario);
    const restaurant = RestauranteEntity.fromObject(restaurante);

    // Reserva.create({
    //     id_usuario:user.email,
    //     id_restaurante: restaurant.email,
    //     hora: 'awawdea',
    //     fecha:'awaawwee'
    //   })
      
    Reserva.findAll({
      where: {
          id_usuario: user.email
      },
      include: {
          model: Usuario,

      }
  }).then(reservas => {
      console.log(reservas);
  }).catch(error => {
      console.error('Error al buscar reservas:', error);
  });
}