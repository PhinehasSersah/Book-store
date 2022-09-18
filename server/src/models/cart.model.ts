import { Schema, model } from "mongoose";
import { CartDocument, CartItem } from "../utils/cart.types";

const CartSchema = new Schema<CartItem>(
	{
		bookID: {
			type: Schema.Types.ObjectId,
			ref: "Book",
			required: [true, "provide book id"],
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "provide user id"],
		},
		quantity: {
			type: Number,
			default: 1,
		},
	},
	{ timestamps: true }
);

CartSchema.index({ bookID: 1, createdBy: 1 }, { unique: true });

const Cart = model<CartDocument>("Cart", CartSchema);

export default Cart;
