import { StatusCodes } from "http-status-codes";
import CustomError from "./defaultError";

class BadRequestErr extends CustomError {
	statusCode: number;
	constructor(message: string) {
		super(message);
		this.statusCode = StatusCodes.BAD_REQUEST;
	}
}

export default BadRequestErr;
