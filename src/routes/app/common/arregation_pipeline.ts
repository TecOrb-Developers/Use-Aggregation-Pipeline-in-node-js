import { StatusCodes } from "http-status-codes";
import { Response, Router, Request } from 'express'
import faq_commonController from "@controllers/common/arregation_pipeline";

//Constant
var router = Router();
const { CREATED, OK } = StatusCodes;

export const p = {

    list: '/List'
    
} as const



//LIST Faq
router.get(p.list, async (req: any, res: Response) => {
    const data = await faq_commonController.useAggregationPipeline();
    return res.status(OK).send({ data, code: OK, message: 'Success' });
});

export default router;