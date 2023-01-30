import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
	return (
		<div className="App">
			<Navbar />
			<div className="pages">
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="login" element={<Login />} />
					<Route path="signup" element={<Signup />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
