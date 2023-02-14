// imports
const mongoose = require("mongoose");

// get Schema
const Schema = mongoose.Schema;

const orderSchema = new Schema(
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
		amount: {
			type: Number,
			required: true,
		},
		address: {
			type: Object,
			require: true,
		},
		status: {
			type: String,
			default: "pending",
		},
	},
	{ timestamps: true }
);

// create the order Model and export
const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;
