import { Schema, model } from "mongoose";
import { OrderDocument, OrderInput, OrderItem } from "../utils/order.types";

const OrderItemSchema = new Schema<OrderItem>({
	bookID: {
		type: Schema.Types.ObjectId,
		ref: "Book",
		required: [true, "provide book id"],
	},
	price: {
		type: Number,
		required: [true, "provide purchase price"],
	},
	quantity: {
		type: Number,
		required: [true, "provide quantity of purchase"],
	},
});

const OrderSchema = new Schema<OrderInput>(
	{
		cartItems: {
			type: [OrderItemSchema],
			required: true,
		},
		orderBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "provide user"],
		},
		total_price: {
			type: Number,
			required: [true, "provide total cost"],
		},
	},
	{ timestamps: true }
);

OrderSchema.post("save", async function (next) {
	console.log("save hook");
	await this.$model("Cart").deleteMany({ createdBy: this.orderBy });
});

const Order = model<OrderDocument>("Order", OrderSchema);

export default Order;
