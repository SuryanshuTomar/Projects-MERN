// imports
const mongoose = require("mongoose");

// get Schema
const Schema = mongoose.Schema;

const productSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			unique: true,
			minLength: [3, "Min length for the title is 3"],
			maxLength: [50, "Max charachter allowed for title is 50"],
		},
		desc: {
			type: String,
			require: true,
		},
		img: {
			type: String,
			require: true,
		},
		categories: {
			type: Array,
			require: true,
		},
		size: {
			type: String,
		},
		color: {
			type: String,
		},
		price: {
			type: Number,
			require: true,
		},
	},
	{ timestamps: true }
);

// create the product Model and export
const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
