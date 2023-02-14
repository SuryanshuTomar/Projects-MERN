const express = require("express");
const router = express.Router();

router.get("/usertest", (req, res) => {
	res.status(200).json({
		status: "Success",
		messsage: "User test is working...",
	});
});

module.exports = router;
