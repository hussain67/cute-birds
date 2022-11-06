import React from "react";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const Card = ({ name, phone, email, image }) => {
	const [favourate, setFavourate] = useState(false);

	return (
		<article className="card">
			<div className="card__header">
				<img
					className="card__img"
					src={image.url}
					alt={image.alt}
				/>

				<div
					className="card__icon"
					onClick={() => setFavourate(!favourate)}
				>
					{favourate ? <AiFillHeart /> : <AiOutlineHeart />}
				</div>
			</div>

			<h2 className="card__name">{name}</h2>
			<h3>{phone}</h3>
			<h3>{email}</h3>
		</article>
	);
};

export default Card;
