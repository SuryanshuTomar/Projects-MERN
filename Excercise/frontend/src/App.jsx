import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
	const { user } = useAuthContext();

	return (
		<div className="App">
			<Navbar />
			<div className="pages">
				<Routes>
					<Route
						path="/"
						element={user ? <Homepage /> : <Navigate to="/login" />}
					/>
					<Route
						path="login"
						element={!user ? <Login /> : <Navigate to="/" />}
					/>
					<Route
						path="signup"
						element={!user ? <Signup /> : <Navigate to="/" />}
					/>
				</Routes>
			</div>
		</div>
	);
}

export default App;
