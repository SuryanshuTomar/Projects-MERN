// imports
const express = require("express");
const {
	verifyTokenAndAuthorize,
	verifyTokenAndAuthorizeAdmin,
} = require("../middlewares/verify.middleware");
const CryptoJs = require("crypto-js");
const UserModel = require("../models/user.model");

// get the router
const router = express.Router();

// routes

// test route
router.get("/usertest", (req, res) => {
	res.status(200).json({
		status: "Success",
		messsage: "User test is working...",
	});
});

// update user
router.put("/:id", verifyTokenAndAuthorize, async (req, res) => {
	const { password } = req.body;
	const { id } = req.params;

	if (password) {
		password = CryptoJs.AES.encrypt(
			password,
			process.env.PASS_SECRET
		).toString();
	}

	try {
		const updatedUser = await UserModel.findByIdAndUpdate(
			id,
			{
				$set: req.body,
			},
			{ new: true, runValidators: true }
		);

		res.status(200).json(updatedUser);
	} catch (error) {
		res.status(500).json(error);
	}
});

// delete user
router.delete("/:id", async (req, res) => {
	try {
		await UserModel.findByIdAndDelete(req.params.id);
		res.status(200).json("User deleted!!");
	} catch (error) {
		res.status(500).json(error);
	}
});

// get user
router.get("/find/:id", verifyTokenAndAuthorizeAdmin, async (req, res) => {
	try {
		const user = await UserModel.findById(req.params.id);

		const { password, ...restUserData } = user._doc;

		res.status(200).json({ ...restUserData });
	} catch (error) {
		res.status(500).json(error);
	}
});

// get all user
router.get("/all", verifyTokenAndAuthorizeAdmin, async (req, res) => {
	const query = req.query.new;

	try {
		const users = query
			? await UserModel.find().sort({ _id: -1 }).limit(1)
			: await UserModel.find({});

		res.status(200).json(users);
	} catch (error) {
		res.status(500).json(error);
	}
});

// get user stats
router.get("/stats", verifyTokenAndAuthorizeAdmin, async (req, res) => {
	const date = new Date();
	const lastYear = new Date(date.setFullYear(date.getFullYear) - 1);

	try {
		const data = await UserModel.aggregate([
			{ $match: { createdAt: { $gte: lastYear } } },
			{
				$project: {
					// this will take the value of month from the createdAt value
					// and assign it to the month variable
					month: { $month: "$createdAt" },
				},
			},
			{
				$group: {
					// _id is the month number
					_id: "$month",
					total: { $sum: 1 },
				},
			},
		]);

		res.status(200).json(data);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
