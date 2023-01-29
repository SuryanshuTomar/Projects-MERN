const { CustomAPIError } = require("../errors/custom-error");

module.exports = errorHandlerMiddlerware = (error, req, res, next) => {
	if (error instanceof CustomAPIError) {
		return res
			.status(error.status)
			.json({ status: "failed", message: error.message });
	}

	return res.status(500).json({
		status: "failed",
		message: "Something Went Wrong, please try again!!",
	});
};
