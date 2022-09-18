import mongoose from "mongoose";
import { BookDocument } from "./book.types";
import { UserDocument } from "./user.types";

export interface OrderItem {
	bookID: BookDocument["_id"];
	quantity: number;
	price: number;
}

export interface OrderInput {
	cartItems: OrderItem[];
	total_price: number;
	orderBy: UserDocument["_id"];
}

export interface OrderDocument extends OrderInput, mongoose.Document {
	createdAt: Date;
	updatedAt: Date;
}
