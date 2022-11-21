import React, { useContext } from "react";

import Card from "../card/Card";
import { BirdContext } from "../../context/birdContext";
//import birds from "../../mocks/birds.json";

const Cards = () => {
	const { birds } = useContext(BirdContext);
	return (
		<section className="cards">
			{birds.map(bird => (
				<Card
					key={bird.id}
					{...bird}
				/>
			))}
		</section>
	);
};

export default Cards;
