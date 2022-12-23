import React from "react";
import { useBirds } from "../../context/birdContext";

import Card from "../card/Card";
import Spinner from "../common/Spinner";
//import birds from "../../mocks/birds.json";

const Cards = () => {
	const { birds, isLoading } = useBirds();

	return isLoading ? (
		<Spinner />
	) : (
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
