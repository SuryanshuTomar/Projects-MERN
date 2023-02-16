const CartModel = require("../models/cart.model");
const {
	verifyToken,
	verifyTokenAndAuthorize,
	verifyTokenAndAuthorizeAdmin,
} = require("../middlewares/verify.middleware");

const router = require("express").Router();

// creat cart
router.post("/", verifyToken, async (req, res) => {
	const newCart = new CartModel(req.body);

	try {
		const savedCart = await newCart.save();
		res.status(200).json(savedCart);
	} catch (err) {
		res.status(500).json(err);
	}
});

// update cart
router.put("/:id", verifyTokenAndAuthorize, async (req, res) => {
	try {
		const updatedCart = await CartModel.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedCart);
	} catch (err) {
		res.status(500).json(err);
	}
});

// delete cart
router.delete("/:id", verifyTokenAndAuthorize, async (req, res) => {
	try {
		await CartModel.findByIdAndDelete(req.params.id);
		res.status(200).json("Cart has been deleted...");
	} catch (err) {
		res.status(500).json(err);
	}
});

// get user cart
router.get("/find/:userId", verifyTokenAndAuthorize, async (req, res) => {
	try {
		const cart = await CartModel.findOne({ userId: req.params.userId });
		res.status(200).json(cart);
	} catch (err) {
		res.status(500).json(err);
	}
});

// get all cart
router.get("/", verifyTokenAndAuthorizeAdmin, async (req, res) => {
	try {
		const carts = await CartModel.find();
		res.status(200).json(carts);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
