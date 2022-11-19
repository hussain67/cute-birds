import React from "react";
import { useUser } from "../../context/userContext";

const Nav = () => {
	const { user } = useUser();

	return (
		<nav className="nav">
			<div className="nav__banner">Bird's world</div>
			<div
				className="nav__name"
				data-testid="user"
			>
				{user}
			</div>
		</nav>
	);
};

export default Nav;
