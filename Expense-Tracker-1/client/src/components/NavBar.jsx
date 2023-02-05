import { NavLink } from "react-router-dom";

const NavBar = () => {
	return (
		<nav>
			<h3>Expense Tracker</h3>
			<NavLink to="/" className="navLink">
				Home
			</NavLink>
         
		</nav>
	);
};
export default NavBar;
