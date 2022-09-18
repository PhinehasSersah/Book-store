import mongoose from "mongoose";
import { UserDocument } from "./user.types";

export interface BookInput {
	title: string;
	description: string;
	picture: string;
	quantity: number;
	price: number;
	user: UserDocument["_id"];
}

export interface BookDocument extends BookInput, mongoose.Document {
	createdAt: Date;
	updatedAt: Date;
}
