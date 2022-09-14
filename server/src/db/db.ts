import mongoose from "mongoose";

const connectDb = (url: string) => {
	return mongoose.connect(url);
};

export default connectDb;
