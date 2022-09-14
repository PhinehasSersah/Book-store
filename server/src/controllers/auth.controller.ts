import { createJwt } from "./../utils/jwt";
import { StatusCodes } from "http-status-codes";
import { RequestHandler } from "express";
import User from "../models/auth.model";
import { UserDocument } from "../utils/user.types";
import { BadRequestErr, NotFound, Unauthenticated } from "../errors";

export const registerHandler: RequestHandler<{}, {}, UserDocument> = async (
	req,
	res
) => {
	const { name, password } = req.body;
	if (!name || !password) {
		throw new BadRequestErr("provide email and password");
	}
	const user = await User.create(req.body);

	res
		.status(StatusCodes.CREATED)
		.json({ user: { name: user.name, id: user._id } });
};

export const loginHandler: RequestHandler<{}, {}, UserDocument> = async (
	req,
	res
) => {
	const { name, password } = req.body;
	if (!name || !password) {
		throw new BadRequestErr("provide email and password");
	}
	const user = await User.findOne({ name });
	if (!user) {
		throw new Unauthenticated("invalid credentials");
	}

	const isPasswordMatch = await user.comparePassword(password);
	if (!isPasswordMatch) {
		throw new Unauthenticated("invalid credentials");
	}
	const payload = { name: user.name, id: user._id };
	const token = createJwt(payload);

	res
		.status(StatusCodes.OK)
		.json({ user: { name: user.name, id: user._id }, token });
};
