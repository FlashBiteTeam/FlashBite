import { Router } from 'express';
import { AuthController } from './controller';
import { MongoOTPDatasource } from '../../infrastructure/datasources/mongo-otp.datasource';
import { MysqlUserDatasource } from '../../infrastructure/datasources/mysql-user.datasource';
import { OTPRepositoryImpl } from '../../infrastructure/repositories/otp.repository.impl';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl';
import { AuthService } from '../services/auth.service';
import { EmailService } from '../services/email.service';
import { envs } from '../../config/envs';
import { MysqlRestauranteDatasource } from '../../infrastructure/datasources/mysql-restaurante.datasource';
import { RestauranteRepositoryImpl } from '../../infrastructure/repositories/restaurante.repository.impl';





export class AuthRoutes {


  static get routes(): Router {

    const router = Router();

    // * OTP
    const mongodatasource = new MongoOTPDatasource();
    const mongoRepository = new OTPRepositoryImpl(mongodatasource);
    // * Registro usuarios
    const mysqldatasource = new MysqlUserDatasource();
    const mysqlyRepository = new UserRepositoryImpl(mysqldatasource);
    // * Registro restaurantes
    const mysqlRestauranteDatasource = new MysqlRestauranteDatasource();
    const mysqlRestauranteRepository = new RestauranteRepositoryImpl(mysqlRestauranteDatasource);
    // * Envio correos
    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY,
    );
    const authService = new AuthService(emailService,mongoRepository,mysqlyRepository,mysqlRestauranteRepository);
    const controller = new AuthController(authService);
    

    // * RUTAS

    router.post('/register/user',controller.registerUser)
    router.post('/register/restaurante',controller.registerRestaurante)
    router.post('/generate/otp',controller.generateOTP)
    router.post('/login',controller.login)
    router.post('/verify',controller.verifyUser)


    return router;
  }


}

