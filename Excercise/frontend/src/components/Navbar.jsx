import React from "react";
import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

function Navbar() {
	const { logout } = useLogout();

	return (
		<header>
			<div className="container">
				<NavLink to="/">
					<h1>Excercise</h1>
				</NavLink>
				<nav>
					<div>
						<button onClick={logout}>Logout</button>
					</div>
					<div>
						<NavLink to="/login">Login</NavLink>
						<NavLink to="/signup">Signup</NavLink>
					</div>
				</nav>
			</div>
		</header>
	);
}

export default Navbar;
