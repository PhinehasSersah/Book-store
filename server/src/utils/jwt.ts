import jwt from "jsonwebtoken";

export const createJwt = (payload: { name: string; id: string }) => {
	const token = jwt.sign(payload, process.env.JWT_SECRET!);
	return token;
};
