import { useState } from "react";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		console.log(email, password);
	};

	return (
		<form className="login" onSubmit={handleSubmit}>
			<h3>Login</h3>
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
			<button>Login</button>
		</form>
	);
};

export default Login;
