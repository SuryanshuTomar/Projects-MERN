import { useState } from "react";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		console.log(email, password);
	};

	return (
		<form className="signup" onSubmit={handleSubmit}>
			<h3>Sign Up</h3>
			<label htmlFor="email">Email: </label>
			<input
				type="text"
				id="email"
				name="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<label htmlFor="password">Password: </label>
			<input
				type="password"
				id="password"
				name="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button>Sign Up</button>
		</form>
	);
};

export default Signup;
