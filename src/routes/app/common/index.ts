import { Router } from "express";
import aggregationRoute from "./arregation_pipeline";

//Export base-router
var baseRouter = Router();

//setup routers
baseRouter.use('/aggregation',aggregationRoute);

export default baseRouter