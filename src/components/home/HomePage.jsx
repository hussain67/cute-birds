import React from "react";
import Cards from "../cards/Cards";
import Filter from "../filter/Filter";
import Nav from "../nav/Nav";

const HomePage = () => {
	return (
		<>
			<Nav />
			<main className="main-content">
				<Filter />
				<Cards />
			</main>
		</>
	);
};

export default HomePage;
