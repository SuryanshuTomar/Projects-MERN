const OrderModel = require("../models/order.model");
const {
	verifyToken,
	verifyTokenAndAuthorize,
	verifyTokenAndAuthorizeAdmin,
} = require("../middlewares/verify.middleware");

const router = require("express").Router();

// create order
router.post("/", verifyToken, async (req, res) => {
	const newOrder = new OrderModel(req.body);

	try {
		const savedOrder = await newOrder.save();
		res.status(200).json(savedOrder);
	} catch (err) {
		res.status(500).json(err);
	}
});

// update order
router.put("/:id", verifyTokenAndAuthorizeAdmin, async (req, res) => {
	try {
		const updatedOrder = await OrderModel.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedOrder);
	} catch (err) {
		res.status(500).json(err);
	}
});

// delete order
router.delete("/:id", verifyTokenAndAuthorizeAdmin, async (req, res) => {
	try {
		await OrderModel.findByIdAndDelete(req.params.id);
		res.status(200).json("OrderModel has been deleted...");
	} catch (err) {
		res.status(500).json(err);
	}
});

// get user order
router.get("/find/:userId", verifyTokenAndAuthorize, async (req, res) => {
	try {
		const orders = await OrderModel.find({ userId: req.params.userId });
		res.status(200).json(orders);
	} catch (err) {
		res.status(500).json(err);
	}
});

// get all orders
router.get("/", verifyTokenAndAuthorizeAdmin, async (req, res) => {
	try {
		const orders = await OrderModel.find();
		res.status(200).json(orders);
	} catch (err) {
		res.status(500).json(err);
	}
});

// get monthly income
router.get("/income", verifyTokenAndAuthorizeAdmin, async (req, res) => {
	const date = new Date();
	const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
	const lastToLastMonth = new Date(
		new Date().setMonth(lastMonth.getMonth() - 1)
	);

	try {
		const income = await OrderModel.aggregate([
			{ $match: { createdAt: { $gte: lastToLastMonth } } },
			{
				$project: {
					// this will take the value of month from the createdAt value
					// and assign it to the month variable
					// and then later in the $groupo we can utilize this month variable value
					month: { $month: "$createdAt" },

					// creating a sales variable with amount
					sales: "$amount",
				},
			},
			{
				$group: {
					_id: "$month",
					total: { $sum: "$sales" },
				},
			},
		]);
		res.status(200).json(income);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
