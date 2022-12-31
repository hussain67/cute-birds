import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/userContext";
import { signOutUser } from "../../utils/firebase/firebase.utils";

const Nav = () => {
	const { displayName } = useUser();

	const navigate = useNavigate();

	const signOut = () => {
		signOutUser();
		navigate("/");
	};
	return (
		<nav className="nav">
			<div className="nav__banner">Bird's world</div>
			<div
				className="nav__name"
				data-testid="user"
			>
				Welcome {displayName}
			</div>
			<div>
				<button
					className="btn"
					onClick={signOut}
				>
					Log out
				</button>
			</div>
		</nav>
	);
};

export default Nav;
