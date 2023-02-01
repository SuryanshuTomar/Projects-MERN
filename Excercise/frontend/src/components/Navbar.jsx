import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

function Navbar() {
	const { logout } = useLogout();
	const { user } = useAuthContext();

	return (
		<header>
			<div className="container">
				<NavLink to="/">
					<h1>Excercise</h1>
				</NavLink>
				<nav>
					{user && (
						<div>
							<span>{user.email}</span>
							<button onClick={logout}>Logout</button>
						</div>
					)}
					{!user && (
						<div>
							<NavLink to="/login">Login</NavLink>
							<NavLink to="/signup">Signup</NavLink>
						</div>
					)}
				</nav>
			</div>
		</header>
	);
}

export default Navbar;
