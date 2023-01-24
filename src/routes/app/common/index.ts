import { base } from "@models/customer";
import { Router } from "express";
import reportIssueRoute from "./report&Issue";
import faqRoute from "./faq";

//Export base-router
var baseRouter = Router();

//setup routers
baseRouter.use('/report',reportIssueRoute);
baseRouter.use('/faq',faqRoute);

export default baseRouter