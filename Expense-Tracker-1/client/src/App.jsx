import React from "react";

import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Edit from "./pages/Edit";
import Home from "./pages/Home";

const App = () => {
	return (
		<div>
			<NavBar />
			<Routes>
				<Route path="/">
					<Route index element={<Home />} />
					<Route path="edit" element={<Edit />} />
				</Route>
			</Routes>
		</div>
	);
};

export default App;
