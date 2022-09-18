import { Router } from "express";
import {
	createCartHandler,
	viewCartHandler,
	updateCartHandler,
	deleteAllCartItemsHandler,
	deleteCartItemHandler,
} from "../controllers/cart.controller";

const router = Router();

router
	.route("/")
	.post(createCartHandler)
	.get(viewCartHandler)
	.delete(deleteAllCartItemsHandler);

router.route("/:id").put(updateCartHandler).delete(deleteCartItemHandler);

export default router;
