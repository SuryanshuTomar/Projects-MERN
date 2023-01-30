import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { WorkoutContextProvider } from "./context/WorkoutContext";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthContextProvider>
			<WorkoutContextProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</WorkoutContextProvider>
		</AuthContextProvider>
	</React.StrictMode>
);
