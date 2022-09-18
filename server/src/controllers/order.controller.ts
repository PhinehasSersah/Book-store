import { StatusCodes } from "http-status-codes";
import { RequestHandler } from "express";
import { OrderInput, OrderItem } from "../utils/order.types";
import Book from "../models/book.model";
import { BadRequestErr, NotFound } from "../errors";
import Order from "../models/order.model";

export const createOrderItemsHandler: RequestHandler<
	{},
	{},
	OrderInput
> = async (req, res) => {
	const { cartItems: orderItems, total_price: overAllPrice } = req.body;

	if (!orderItems || !orderItems.length) {
		throw new BadRequestErr("no cart Items provided");
	}

	if (!overAllPrice) {
		throw new BadRequestErr("provide total price");
	}

	let cartItems: OrderItem[] = [];
	let total_price = 0;

	for (const item of orderItems) {
		const bookItem = await Book.findOne({ _id: item.bookID });
		if (!bookItem) {
			throw new NotFound(`no book found with id:${item.bookID}`);
		}
		const { price: bookPrice, quantity } = bookItem;
		const price = bookPrice * item.quantity;
		cartItems = [...cartItems, { ...item, price }];
		total_price += price;
		bookItem.quantity = quantity - item.quantity;
		await bookItem.save();
	}

	const order = await Order.create({
		cartItems,
		total_price,
		orderBy: req.user.id,
	});
	res.status(StatusCodes.OK).json({ order, msg: "abt to create order" });
};

export const myOrdersHandler: RequestHandler = async (req, res) => {
	const orders = await Order.find({ orderBy: req.user.id });

	res.status(StatusCodes.OK).json({ count: orders.length, orders });
};
