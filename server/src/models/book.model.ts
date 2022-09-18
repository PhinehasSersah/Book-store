import { Schema, model } from "mongoose";
import { BookDocument, BookInput } from "../utils/book.types";

const BookSchema = new Schema<BookInput>({
	title: {
		type: String,
		required: [true, "provide book title"],
		maxlength: [50, "atmost 50 charaters"],
		minlength: [3, "atleast 3 charaters"],
	},
	description: {
		type: String,
		required: [true, "provide book description"],
		minlength: [3, "atleast 3 charaters"],
	},
	price: {
		type: Number,
		required: [true, "provide book price"],
		default: 0,
	},
	picture: String,
	quantity: {
		type: Number,
		default: 1,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

BookSchema.index({ title: 1, user: 1 }, { unique: true });

const Book = model<BookDocument>("Book", BookSchema);

export default Book;
