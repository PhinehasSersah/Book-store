import mongoose from "mongoose";
import { BookDocument } from "./book.types";
import { UserDocument } from "./user.types";

export interface CartItem {
	quantity: number;
	bookID: BookDocument["_id"];
	createdBy: UserDocument["_id"];
}

export interface CartDocument extends CartItem, mongoose.Document {
	createdAt: Date;
	updatedAt: Date;
}
