import { StatusCodes } from "http-status-codes";
import { json, RequestHandler } from "express";
import Cart from "../models/cart.model";
import { CartItem } from "../utils/cart.types";
import Book from "../models/book.model";
import { BadRequestErr, NotFound } from "../errors";

export const createCartHandler: RequestHandler<{}, {}, CartItem> = async (
	req,
	res
) => {
	const { bookID } = req.body;
	const book = await Book.findOne({ _id: bookID });
	if (!book) {
		throw new NotFound(`no book found with id : ${bookID}`);
	}
	req.body.createdBy = req.user.id;
	const cart = await (
		await Cart.create(req.body)
	).populate("bookID", "title description");

	res.status(StatusCodes.OK).json({ cart, msg: "succesfully added to cart" });
};

export const viewCartHandler: RequestHandler = async (req, res) => {
	const cart = await Cart.find({ createdBy: req.user.id })
		.populate("bookID")
		.populate("createdBy", "name")
		.sort("-createdAt");

	res.status(StatusCodes.OK).json({ count: cart.length, cart });
};

export const updateCartHandler: RequestHandler<
	{ id: string },
	{},
	{ quantity: number }
> = async (req, res) => {
	const { quantity } = req.body;
	const cart = await Cart.findOne({
		_id: req.params.id,
		createdBy: req.user.id,
	}).populate("bookID", "quantity");

	if (quantity <= 0) {
		throw new BadRequestErr("quantity must be atleast 1");
	}

	if (!cart) {
		throw new NotFound(`no cart found with id : ${req.params.id}`);
	}

	if (quantity > cart.bookID.quantity) {
		throw new BadRequestErr(`only ${cart.bookID.quantity} quantity left`);
	}
	cart.quantity = quantity;
	await cart.save();

	res.status(StatusCodes.OK).json({ cart });
};

export const deleteCartItemHandler: RequestHandler<{ id: string }> = async (
	req,
	res
) => {
	const cart = await Cart.findOne({
		_id: req.params.id,
		createdBy: req.user.id,
	});

	if (!cart) {
		throw new NotFound(`no cart found with id : ${req.params.id}`);
	}

	await cart.remove();
	res.status(StatusCodes.OK).json({ msg: "sucessfully deleted" });
};

export const deleteAllCartItemsHandler: RequestHandler<{ id: string }> = async (
	req,
	res
) => {
	const cart = await Cart.deleteMany({ createdBy: req.user.id });

	res.status(StatusCodes.OK).json({ msg: "cart succesfully cleared", cart });
};
