module.exports = notFound = (req, res) => {
	res.status(404).json({
		status: "success",
		message: "Route does not Exists!",
	});
};
