import { Router } from "express";
import {
	createOrderItemsHandler,
	myOrdersHandler,
} from "../controllers/order.controller";

const router = Router();

router.route("/").post(createOrderItemsHandler).get(myOrdersHandler);

export default router;
