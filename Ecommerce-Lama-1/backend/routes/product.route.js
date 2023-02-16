// imports
const express = require("express");
const {
	verifyTokenAndAuthorize,
	verifyTokenAndAuthorizeAdmin,
} = require("../middlewares/verify.middleware");
const CryptoJs = require("crypto-js");
const ProductModel = require("../models/product.model");

// get the router
const router = express.Router();

// routes

// create product
router.post("/", verifyTokenAndAuthorizeAdmin, async (req, res) => {
	const newProduct = new ProductModel(req.body);

	try {
		const savedProduct = await newProduct.save();
		res.status(201).json(savedProduct);
	} catch (error) {
		res.status(500).json(error);
	}
});

// update product
router.put("/:id", verifyTokenAndAuthorizeAdmin, async (req, res) => {
	try {
		const updatedProduct = await ProductModel.findByIdAndUpdate(
			id,
			{
				$set: req.body,
			},
			{ new: true, runValidators: true }
		);

		res.status(200).json(updatedProduct);
	} catch (error) {
		res.status(500).json(error);
	}
});

// delete product
router.delete("/:id", verifyTokenAndAuthorizeAdmin, async (req, res) => {
	try {
		await ProductModel.findByIdAndDelete(req.params.id);
		res.status(200).json("Product deleted!!");
	} catch (error) {
		res.status(500).json(error);
	}
});

// get product
router.get("/find/:id", async (req, res) => {
	try {
		const product = await ProductModel.findById(req.params.id);

		res.status(200).json(product);
	} catch (error) {
		res.status(500).json(error);
	}
});

// get all products
router.get("/", async (req, res) => {
	const qNew = req.query.new;
	const qCategory = req.query.category;

	try {
		let products;

		if (qNew) {
			products = await ProductModel.find().sort({ createdAt: -1 }).limit(1);
		} else if (qCategory) {
			products = await ProductModel.find({
				categories: { $in: [qCategory] },
			});
		} else {
			products = await ProductModel.find();
		}

		res.status(200).json(products);
	} catch (error) {
		res.status(500).json(error);
	}
});

// // get user stats
// router.get("/stats", verifyTokenAndAuthorizeAdmin, async (req, res) => {
// 	const date = new Date();
// 	const lastYear = new Date(date.setFullYear(date.getFullYear) - 1);

// 	try {
// 		const data = await UserModel.aggregate([
// 			{ $match: { createdAt: { $gte: lastYear } } },
// 			{
// 				$project: {
// 					// this will take the value of month from the createdAt value
// 					// and assign it to the month variable
// 					month: { $month: "$createdAt" },
// 				},
// 			},
// 			{
// 				$group: {
// 					// _id is the month number
// 					_id: "$month",
// 					total: { $sum: 1 },
// 				},
// 			},
// 		]);

// 		res.status(200).json(data);
// 	} catch (error) {
// 		res.status(500).json(error);
// 	}
// });

module.exports = router;
