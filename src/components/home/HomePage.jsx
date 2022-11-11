import React from "react";
import Cards from "../cards/Cards";
import Filter from "../filter/Filter";
import { BirdProvider } from "../../context/birdContext";

const HomePage = () => {
	return (
		<div className="home">
			<BirdProvider>
				<Filter />
				<Cards />
			</BirdProvider>
		</div>
	);
};

export default HomePage;
