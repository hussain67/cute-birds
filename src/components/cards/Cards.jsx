import React from "react";
import { useBirds } from "../../contexts/birdContext";

import Card from "../card/Card";
import Spinner from "../spinner/Spinner";

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
