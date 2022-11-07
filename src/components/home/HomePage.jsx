import React from "react";
import Cards from "../cards/Cards";
import Filter from "../filter/Filter";

const HomePage = () => {
	return (
		<div className="home">
			<Filter />
			<Cards />
		</div>
	);
};

export default HomePage;
