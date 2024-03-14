import { Router } from 'express';
import { AuthController } from './controller';
import { MongoOTPDatasource } from '../../infrastructure/datasources/mongo-otp.datasource';




export class AuthRoutes {


  static get routes(): Router {

    const router = Router();

    const mongodatasource = new MongoOTPDatasource();
    const controller = new AuthController(mongodatasource);
    
    router.post('/register',controller.registerUser)


    return router;
  }


}

