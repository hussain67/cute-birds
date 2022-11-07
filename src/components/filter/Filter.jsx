import React from "react";

const Filter = () => {
	return (
		<section className="filter">
			<div>
				<label htmlFor="favourate">Favourate</label> <br />
				<select
					name="favourate"
					id="favourate"
				>
					<option value="any">Any</option>
					<option value="favourate">Favourate</option>
					<option value="not favourate">Not Favourate</option>
				</select>
			</div>
			<div>
				<label htmlFor="size">Size</label>
				<br />
				<select
					name="size"
					id="size"
					className="filter__size"
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
