import React from "react";
import { useBirds } from "../../contexts/birdContext.js";

const Filter = () => {
	const { setSelected } = useBirds();
	return (
		<section className="filter">
			<div>
				<label htmlFor="favourate">Favourate</label>
				<select
					name="favourate"
					id="favourate"
					onChange={setSelected}
				>
					<option value="any">Any</option>
					<option value="favourate">Favourate</option>
					<option value="not favourate">Not Favourate</option>
				</select>
			</div>

			<div>
				<label htmlFor="size">Size</label>

				<select
					name="size"
					id="size"
					className="filter__size"
					onChange={setSelected}
				>
					<option value="any">Any</option>
					<option value="small">Small</option>
					<option value="large">Large</option>
				</select>
			</div>
		</section>
	);
};

export default Filter;
