// imports
const express = require("express");

// get the router
const router = express.Router();


// routes
router.get("/usertest", (req, res) => {
	res.status(200).json({
		status: "Success",
		messsage: "User test is working...",
	});
});

module.exports = router;
