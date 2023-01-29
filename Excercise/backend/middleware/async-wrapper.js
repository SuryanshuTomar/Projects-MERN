const asyncWrapper = (passedFunction) => {
	// we get the access of req, res and next from the passedFunction
	return async (req, res, next) => {
		// try-catch to run our passedFunction and handle errors if it throws any.
		try {
			await passedFunction(req, res, next);
		} catch (error) {
			next(error);
		}
	};
};

module.exports = asyncWrapper;
