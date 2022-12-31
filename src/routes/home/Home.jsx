import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	return (
		<div className="home">
			<div className="home__content">
				<h1>Explore the wonderful world of birds</h1>
				<div>
					<button onClick={() => navigate("/authentication")}>Log In</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
