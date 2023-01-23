import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";

function App() {
	return (
		<div className="App">
			<Navbar />
			<div className="pages">
				<Routes>
					<Route path="/" element={<Homepage />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
