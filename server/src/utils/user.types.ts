import mongoose, { Model } from "mongoose";

declare module "express-serve-static-core" {
	interface Request {
		user: {
			name: string;
			id: string;
		};
	}
}

export interface UserTokenPayload {
	name: string;
	_id: UserDocument["_id"];
}

export interface UserInput {
	name: string;
	password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
	createdAt: Date;
	updatedAt: Date;
	comparePassword(input: string): Promise<boolean>;
	createJWT(): string;
}

type FileUploadPath = "MERN-SOCIAL/Profile-photos" | "MERN-SOCIAL/posts-photos";

type Upload = (
	path: string,
	{ use_filename, folder }: { use_filename: boolean; folder: FileUploadPath }
) => { secure_url: string };
export interface Cloudinary {
	uploader: {
		upload: Upload;
	};
}
