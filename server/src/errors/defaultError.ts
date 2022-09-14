class CustomError extends Error {
	statusCode: number | undefined;
	constructor(message: string, statusCode?: number) {
		super(message);
		this.message = message;
		this.statusCode = statusCode;
	}
}

export default CustomError;
