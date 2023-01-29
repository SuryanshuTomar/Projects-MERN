// Login User Logic
const loginUser = async (req, res) => {
	res.status(200).json({ status: "success", message: "Logged In!!" });
};

// Signup User Logic
const signupUser = async (req, res) => {
	res.status(200).json({ status: "success", message: "Signed Up!!" });
};

module.exports = { loginUser, signupUser };
