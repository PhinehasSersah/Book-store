import { StatusCodes } from "http-status-codes";
import CustomError from "./defaultError";

class Unauthorized extends CustomError {
	statusCode: number;
	constructor(message: string) {
		super(message);
		this.statusCode = StatusCodes.FORBIDDEN;
	}
}

export default Unauthorized;
