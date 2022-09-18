import { StatusCodes } from "http-status-codes";
import { RequestHandler } from "express";
import { UploadedFile } from "express-fileupload";
import { BadRequestErr, NotFound } from "../errors";
import { Cloudinary } from "../utils/user.types";
import fs from "fs";
const cloudinary: Cloudinary = require("cloudinary").v2;

import { BookInput } from "../utils/book.types";
import Book from "../models/book.model";

export const createBookHandler: RequestHandler<{}, {}, BookInput> = async (
	req,
	res
) => {
	req.body.user = req.user.id;
	let picture = "";

	if (!req.files) {
		throw new BadRequestErr("please select file");
	}

	const postImage = req.files.picture as UploadedFile;
	// check file type
	if (!postImage.mimetype.startsWith("image")) {
		throw new BadRequestErr("please upload an image file");
	}
	const imgFile = await cloudinary.uploader.upload(postImage.tempFilePath, {
		use_filename: true,
		folder: "MERN-SOCIAL/posts-photos",
	});
	picture = imgFile.secure_url;
	fs.unlinkSync(postImage.tempFilePath);
	req.body.picture = picture;

	const book = await Book.create(req.body);

	res.status(StatusCodes.CREATED).json({ book });
};

export const editBookHandler: RequestHandler<
	{ id: string },
	{},
	BookInput
> = async (req, res) => {
	if (req.files) {
		const postImage = req.files.picture as UploadedFile;

		if (!postImage.mimetype.startsWith("image")) {
			throw new BadRequestErr("please upload an image file");
		}

		const imgFile = await cloudinary.uploader.upload(postImage.tempFilePath, {
			use_filename: true,
			folder: "MERN-SOCIAL/posts-photos",
		});
		const picture = imgFile.secure_url;
		fs.unlinkSync(postImage.tempFilePath);
		req.body.picture = picture;
	}

	const book = await Book.findOneAndUpdate(
		{ _id: req.params.id, user: req.user.id },
		req.body,
		{ new: true, runValidators: true }
	);

	if (!book) {
		throw new NotFound(`no book found with id : ${req.params.id}`);
	}
	res.status(StatusCodes.CREATED).json({ book });
};

export const deleteBookHandler: RequestHandler<{ id: string }, {}, {}> = async (
	req,
	res
) => {
	const book = await Book.findOne({ _id: req.params.id });
	if (!book) {
		throw new NotFound(`no book found with id : ${req.params.id}`);
	}
	await book.remove();
	res
		.status(StatusCodes.OK)
		.json({ msg: `book with id : ${req.params.id} successfully deleted` });
};

export const getBooksHandler: RequestHandler<
	{},
	{},
	{},
	{ q: string }
> = async (req, res) => {
	const { q } = req.query;
	const queryObj: { title?: any; quantity: any } = { quantity: { $gt: 0 } };

	if (q) {
		queryObj.title = { $regex: q, $options: "i" };
	}

	const books = await Book.find(queryObj).sort("title");
	res.status(StatusCodes.OK).json({ count: books.length, books });
};
