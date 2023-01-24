import { Router } from 'express';
import userRoute from './customer';
import vendorRoute from './vendor';
import commonRoute from './common';
import doorKeeperRoute from './door_Keeper';


// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/customer', userRoute)
baseRouter.use('/vendor', vendorRoute)
baseRouter.use('/common', commonRoute)
baseRouter.use('/doorKeeper', doorKeeperRoute)



// Export default.
export default baseRouter;
