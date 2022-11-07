import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../card/Card";
//import birds from "../../mocks/birds.json";

const Cards = () => {
	const [birds, setBirds] = useState([]);
	useEffect(() => {
		axios.get("http://localhost:4000/birds").then(birds => setBirds(birds.data));
	}, [birds]);

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
