import React from "react";

import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";

const App = () => {
	return (
		<div>
			<NavBar />
			<hr />
			<Routes>
				<Route path="/">
					<Route index element={<Home />} />
				</Route>
			</Routes>
		</div>
	);
};

export default App;
