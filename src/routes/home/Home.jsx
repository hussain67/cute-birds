import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	return (
		<div className="home">
			<h1>This site is under development</h1>
			<button onClick={() => navigate("/authentication")}>Log In</button>
		</div>
	);
};

export default Home;
