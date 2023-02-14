// imports
const mongoose = require("mongoose");

// get Schema
const Schema = mongoose.Schema;

const cartSchema = new Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		products: [
			{
				productId: {
					type: String,
				},

				quantity: {
					type: Number,
					default: 1,
				},
			},
		],
	},
	{ timestamps: true }
);

// create the cart Model and export
const cartModel = mongoose.model("Cart", cartSchema);
module.exports = cartModel;
