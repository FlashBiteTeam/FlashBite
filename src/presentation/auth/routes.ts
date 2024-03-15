import { Router } from 'express';
import { AuthController } from './controller';
import { MongoOTPDatasource } from '../../infrastructure/datasources/mongo-otp.datasource';
import { MysqlUserDatasource } from '../../infrastructure/datasources/mysql-user.datasource';
import { OTPRepositoryImpl } from '../../infrastructure/repositories/otp.repository.impl';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl';
import { AuthService } from '../services/auth.service';





export class AuthRoutes {


  static get routes(): Router {

    const router = Router();

    const mongodatasource = new MongoOTPDatasource();
    const mongoRepository = new OTPRepositoryImpl(mongodatasource);

    const mysqldatasource = new MysqlUserDatasource();
    const mysqlyRepository = new UserRepositoryImpl(mysqldatasource);

    const authService = new AuthService(mongoRepository,mysqlyRepository);
    const controller = new AuthController(authService);
    
    router.post('/register',controller.registerUser)


    return router;
  }


}

