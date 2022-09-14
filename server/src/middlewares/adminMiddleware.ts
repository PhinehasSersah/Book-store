import { RequestHandler } from "express";
import { Unauthorized } from "../errors";

export enum Roles {
	admin = "admin",
}

const adminMiddleware =
	(...user: Roles[]): RequestHandler =>
	async (req, res, next) => {
		if (!user.includes(req.user.name as Roles)) {
			throw new Unauthorized("permission denied");
		}
		next();
	};

export default adminMiddleware;
