import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
	const { signup, isLoading, error } = useSignup();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		console.log(email, password);
		await signup(email, password);
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
			<button className={isLoading ? "loading" : ""} disabled={isLoading}>
				Sign Up
			</button>
			{error && <div className="error">{JSON.stringify(error)}</div>}
		</form>
	);
};

export default Signup;
