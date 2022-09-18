import { NextFunction, Request, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { Unauthenticated } from "../errors";

export const authMiddleware: RequestHandler = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer")) {
		throw new Unauthenticated("user not authenticated");
	}
	const token = authHeader.split(" ")[1];
	try {
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
			name: string;
			id: string;
		};
		req.user = decodedToken;
		next();
	} catch (error) {
		throw new Unauthenticated("user not authenticated");
	}
};
