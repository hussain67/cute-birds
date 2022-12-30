import React from "react";
import Nav from "../../components/nav/Nav";
import Filter from "../../components/filter/Filter";
import Cards from "../../components/cards/Cards";

const Birds = () => {
	return (
		<div>
			<Nav />
			<main className="main-content">
				<Filter />
				<Cards />
			</main>
		</div>
	);
};

export default Birds;
