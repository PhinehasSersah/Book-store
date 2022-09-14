import { StatusCodes } from "http-status-codes";
import CustomError from "./defaultError";

class Unauthenticated extends CustomError {
	statusCode: number;
	constructor(message: string) {
		super(message);
		this.statusCode = StatusCodes.UNAUTHORIZED;
	}
}

export default Unauthenticated;
