import React from "react";
import Card from "../card/Card";
import birds from "../../mocks/birds.json";

const Cards = () => {
	return (
		<main className="cards">
			{birds.map(bird => (
				<Card
					key={bird.id}
					{...bird}
				/>
			))}
		</main>
	);
};

export default Cards;
