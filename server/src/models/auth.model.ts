import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserDocument, UserInput } from "../utils/user.types";

const UserSchema = new Schema<UserInput>(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			minlength: [3, "name must be atleast characters"],
			unique: true,
		},

		password: {
			type: String,
			required: true,
			minlength: [4, "password must be atleast 4 characters"],
		},
	},
	{ timestamps: true }
);

UserSchema.pre("save", async function (next) {
	let user = this as UserDocument;
	if (!user.isModified("password")) return next();
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(this.password, salt);
	this.password = hash;
	return next();
});

UserSchema.methods.comparePassword = async function (
	password: string
): Promise<boolean> {
	const isMatch = await bcrypt.compare(password, this.password);
	return isMatch;
};

const User = model<UserDocument>("User", UserSchema);
export default User;
