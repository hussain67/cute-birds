import React from "react";
import Cards from "../cards/Cards";
import Filter from "../filter/Filter";
import Nav from "../nav/Nav";

const HomePage = () => {
	return (
		<main className="home">
			<Nav />
			<section className="home__content">
				<Filter />
				<Cards />
			</section>
		</main>
	);
};

export default HomePage;
