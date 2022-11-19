import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const BirdContext = createContext({
	birds: []
});

//It is possible to provide initial value createContext({birds: [], })
const BirdProvider = props => {
	const [birds, setBirds] = useState([]);

	const [selectedBirds, setSelectedBirds] = useState([]);

	const [filter, setFilter] = useState({
		size: "any",
		favourate: "any"
	});
	function setSelected(e) {
		const newFilter = { ...filter, [e.target.name]: e.target.value };
		setFilter(newFilter);
	}
	function handleFavourate(id, favourate) {
		let favourateBirds = birds.map(bird => {
			if (bird.id === id) {
				bird.favoured = favourate;
			}
			return bird;
		});
		setBirds(favourateBirds);
	}
	useEffect(() => {
		let filteredBirds = [...birds];
		if (filter.size !== "any") {
			filteredBirds = birds.filter(bird => bird.size === filter.size);
		}
		if (filter.favourate !== "any") {
			filteredBirds = filteredBirds.filter(bird => bird.favoured === (filter.favourate === "favourate" ? true : false));
		}
		setSelectedBirds(filteredBirds);
	}, [filter.size, filter.favourate, birds]);

	useEffect(() => {
		axios.get("http://localhost:4000/birds").then(birds => setBirds(birds.data));
	}, []);

	return (
		<BirdContext.Provider
			value={{ birds: selectedBirds, setSelected, handleFavourate }}
			{...props}
		/>
	);
};
const useBirds = () => useContext(BirdContext);

export { useBirds, BirdProvider };
